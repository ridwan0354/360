<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use InvalidArgumentException;

class PanoramaImageService
{
    public const MAX_BYTES = 25 * 1024 * 1024; // 25 MB safety ceiling

    /**
     * Store, optimize, and generate progressive thumbnail from an uploaded file or data URL.
     *
     * @return array{image_path:string,thumb_path:string,file_size:int}
     */
    public function storeFromUploadOrDataUrl(
        int $eventId,
        ?UploadedFile $file = null,
        ?string $dataUrl = null
    ): array {
        @ini_set('memory_limit', '1024M');

        if ($file !== null) {
            $path = $file->getRealPath();
            if ($path === false || ! file_exists($path)) {
                throw new InvalidArgumentException('Gagal membaca berkas gambar yang diunggah.');
            }
            if (filesize($path) > self::MAX_BYTES) {
                throw new InvalidArgumentException('Ukuran berkas foto melebihi batas maksimum.');
            }

            return $this->processAndSaveFromPath($eventId, $path);
        }

        if ($dataUrl !== null && str_starts_with($dataUrl, 'data:image/')) {
            $parts = explode(',', $dataUrl, 2);
            if (count($parts) !== 2) {
                throw new InvalidArgumentException('Format data gambar hasil pindaian tidak valid.');
            }
            $rawBytes = base64_decode($parts[1], true);
            if ($rawBytes === false || strlen($rawBytes) > self::MAX_BYTES) {
                throw new InvalidArgumentException('Ukuran gambar hasil pindaian melebihi batas atau rusak.');
            }

            return $this->processAndSaveBytes($eventId, $rawBytes);
        }

        throw new InvalidArgumentException('Tidak ada berkas foto panorama atau hasil pindaian 360° yang dikirim.');
    }

    /**
     * Memory-safe processing directly from file path (handles huge 8K-16K panoramas via Imagick + EXIF auto-orient).
     *
     * @return array{image_path:string,thumb_path:string,file_size:int}
     */
    public function processAndSaveFromPath(int $eventId, string $filePath): array
    {
        @ini_set('memory_limit', '1024M');

        if (class_exists(\Imagick::class)) {
            try {
                $im = new \Imagick($filePath);
                if (method_exists($im, 'autoOrient')) {
                    $im->autoOrient();
                }

                $srcW = $im->getImageWidth();
                $srcH = $im->getImageHeight();
                $srcFormat = strtolower((string) $im->getImageFormat());
                $maxW = 4096;
                $modified = false;
                if ($srcW > $maxW) {
                    $targetW = $maxW;
                    $targetH = max(1, (int) round($srcH * ($maxW / $srcW)));
                    $im->resizeImage($targetW, $targetH, \Imagick::FILTER_LANCZOS, 1);
                    $modified = true;
                } else {
                    $targetW = $srcW;
                    $targetH = $srcH;
                }

                // Auto-frame wide cylindrical phone panoramas (aspect > 2.25, e.g. 4:1 native Android/iPhone Pano)
                // cleanly into true 2:1 equirectangular so walls & people never look vertically stretched in 360° VR!
                if ($targetW > 0 && $targetH > 0 && ($targetW / $targetH) > 2.25) {
                    $eqH = (int) round($targetW / 2);
                    $padTop = (int) floor(($eqH - $targetH) / 2);

                    // Create soft blurred ambient backdrop matching room ceiling/floor tones
                    $bg = clone $im;
                    $bg->resizeImage($targetW, $eqH, \Imagick::FILTER_TRIANGLE, 1);
                    $bg->blurImage(45, 22);

                    $bg->compositeImage($im, \Imagick::COMPOSITE_OVER, 0, $padTop);
                    $im->clear();
                    $im->destroy();
                    $im = $bg;
                    $targetH = $eqH;
                    $modified = true;
                }

                $im->stripImage();
                $im->setImageFormat('webp');
                $im->setImageCompressionQuality(92);
                $fullData = $im->getImagesBlob();

                $thumbW = min(640, $targetW);
                $thumbH = max(1, (int) round($targetH * ($thumbW / max(1, $targetW))));
                $im->resizeImage($thumbW, $thumbH, \Imagick::FILTER_TRIANGLE, 1);
                $im->setImageCompressionQuality(70);
                $thumbData = $im->getImagesBlob();

                $im->clear();
                $im->destroy();

                $uuid = (string) Str::uuid();
                $imagePath = "events/{$eventId}/panoramas/{$uuid}.webp";
                $thumbPath = "events/{$eventId}/thumbs/{$uuid}_thumb.webp";

                Storage::disk('public')->put($imagePath, $fullData);
                Storage::disk('public')->put($thumbPath, $thumbData);

                return [
                    'image_path' => $imagePath,
                    'thumb_path' => $thumbPath,
                    'file_size' => strlen($fullData),
                ];
            } catch (\Throwable) {
                // Fallback to GD below if Imagick cannot decode a specific format
            }
        }

        $rawBytes = file_get_contents($filePath);
        if ($rawBytes === false) {
            throw new InvalidArgumentException('Gagal membaca berkas gambar yang diunggah.');
        }

        return $this->processAndSaveBytes($eventId, $rawBytes);
    }

    /**
     * Save optimized full-res WebP/JPEG and lightweight progressive thumbnail from raw bytes.
     *
     * @return array{image_path:string,thumb_path:string,file_size:int}
     */
    public function processAndSaveBytes(int $eventId, string $rawBytes): array
    {
        @ini_set('memory_limit', '1024M');

        if (class_exists(\Imagick::class)) {
            try {
                $im = new \Imagick();
                $im->readImageBlob($rawBytes);
                if (method_exists($im, 'autoOrient')) {
                    $im->autoOrient();
                }

                $srcW = $im->getImageWidth();
                $srcH = $im->getImageHeight();
                $srcFormat = strtolower((string) $im->getImageFormat());
                $maxW = 4096;
                $modified = false;
                if ($srcW > $maxW) {
                    $targetW = $maxW;
                    $targetH = max(1, (int) round($srcH * ($maxW / $srcW)));
                    $im->resizeImage($targetW, $targetH, \Imagick::FILTER_LANCZOS, 1);
                    $modified = true;
                } else {
                    $targetW = $srcW;
                    $targetH = $srcH;
                }

                // Auto-frame wide cylindrical phone panoramas (aspect > 2.25, e.g. 4:1 native Android/iPhone Pano)
                // cleanly into true 2:1 equirectangular so walls & people never look vertically stretched in 360° VR!
                if ($targetW > 0 && $targetH > 0 && ($targetW / $targetH) > 2.25) {
                    $eqH = (int) round($targetW / 2);
                    $padTop = (int) floor(($eqH - $targetH) / 2);

                    // Create soft blurred ambient backdrop matching room ceiling/floor tones
                    $bg = clone $im;
                    $bg->resizeImage($targetW, $eqH, \Imagick::FILTER_TRIANGLE, 1);
                    $bg->blurImage(45, 22);

                    $bg->compositeImage($im, \Imagick::COMPOSITE_OVER, 0, $padTop);
                    $im->clear();
                    $im->destroy();
                    $im = $bg;
                    $targetH = $eqH;
                    $modified = true;
                }

                // Preserve exact lossless-pipeline bytes if input is already an optimized <=4K 2:1 WebP (e.g. from OpenCV 4K stitcher)
                if (! $modified && $srcFormat === 'webp' && $targetW > 0 && $targetH > 0 && abs(($targetW / $targetH) - 2.0) < 0.05) {
                    $fullData = $rawBytes;
                } else {
                    $im->stripImage();
                    $im->setImageFormat('webp');
                    $im->setImageCompressionQuality(92);
                    $fullData = $im->getImagesBlob();
                }

                $thumbW = min(640, $targetW);
                $thumbH = max(1, (int) round($targetH * ($thumbW / max(1, $targetW))));
                $im->stripImage();
                $im->setImageFormat('webp');
                $im->resizeImage($thumbW, $thumbH, \Imagick::FILTER_TRIANGLE, 1);
                $im->setImageCompressionQuality(70);
                $thumbData = $im->getImagesBlob();

                $im->clear();
                $im->destroy();

                $uuid = (string) Str::uuid();
                $imagePath = "events/{$eventId}/panoramas/{$uuid}.webp";
                $thumbPath = "events/{$eventId}/thumbs/{$uuid}_thumb.webp";

                Storage::disk('public')->put($imagePath, $fullData);
                Storage::disk('public')->put($thumbPath, $thumbData);

                return [
                    'image_path' => $imagePath,
                    'thumb_path' => $thumbPath,
                    'file_size' => strlen($fullData),
                ];
            } catch (\Throwable) {
                // Fallback to GD below
            }
        }

        $source = @imagecreatefromstring($rawBytes);
        if (! $source) {
            throw new InvalidArgumentException('Berkas gambar tidak valid atau format tidak didukung.');
        }

        $srcW = imagesx($source);
        $srcH = imagesy($source);

        $maxW = 4096;
        if ($srcW > $maxW) {
            $targetW = $maxW;
            $targetH = max(1, (int) round($srcH * ($maxW / $srcW)));
        } else {
            $targetW = $srcW;
            $targetH = $srcH;
        }

        $fullImg = imagecreatetruecolor($targetW, $targetH);
        imagecopyresampled($fullImg, $source, 0, 0, 0, 0, $targetW, $targetH, $srcW, $srcH);
        imagedestroy($source);

        $thumbW = min(640, $targetW);
        $thumbH = max(1, (int) round($targetH * ($thumbW / $targetW)));
        $thumbImg = imagecreatetruecolor($thumbW, $thumbH);
        imagecopyresampled($thumbImg, $fullImg, 0, 0, 0, 0, $thumbW, $thumbH, $targetW, $targetH);

        $uuid = (string) Str::uuid();
        $useWebp = function_exists('imagewebp');
        $ext = $useWebp ? 'webp' : 'jpg';

        $imagePath = "events/{$eventId}/panoramas/{$uuid}.{$ext}";
        $thumbPath = "events/{$eventId}/thumbs/{$uuid}_thumb.{$ext}";

        $fullData = $this->encodeGdImage($fullImg, $useWebp, 86);
        $thumbData = $this->encodeGdImage($thumbImg, $useWebp, 70);

        Storage::disk('public')->put($imagePath, $fullData);
        Storage::disk('public')->put($thumbPath, $thumbData);

        imagedestroy($fullImg);
        imagedestroy($thumbImg);

        return [
            'image_path' => $imagePath,
            'thumb_path' => $thumbPath,
            'file_size' => strlen($fullData),
        ];
    }

    /**
     * Store a floorplan image (from upload or rendered Canvas Builder snapshot).
     *
     * @return array{image_path:string,width:int,height:int}
     */
    public function storeFloorplanImage(int $eventId, string $rawBytes): array
    {
        @ini_set('memory_limit', '1024M');

        $source = @imagecreatefromstring($rawBytes);
        if (! $source) {
            throw new InvalidArgumentException('Gambar denah tidak valid.');
        }

        $srcW = imagesx($source);
        $srcH = imagesy($source);

        $maxW = 2400;
        if ($srcW > $maxW) {
            $targetW = $maxW;
            $targetH = max(1, (int) round($srcH * ($maxW / $srcW)));
        } else {
            $targetW = $srcW;
            $targetH = $srcH;
        }

        $out = imagecreatetruecolor($targetW, $targetH);
        $white = imagecolorallocate($out, 255, 255, 255);
        imagefill($out, 0, 0, $white);
        imagecopyresampled($out, $source, 0, 0, 0, 0, $targetW, $targetH, $srcW, $srcH);
        imagedestroy($source);

        $uuid = (string) Str::uuid();
        $path = "events/{$eventId}/floorplans/{$uuid}.png";

        ob_start();
        imagepng($out, null, 6);
        $pngBytes = ob_get_clean();

        Storage::disk('public')->put($path, $pngBytes);
        imagedestroy($out);

        return [
            'image_path' => $path,
            'width' => $targetW,
            'height' => $targetH,
        ];
    }

    public function deletePhotoFiles(?string $imagePath, ?string $thumbPath): void
    {
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }
        if ($thumbPath && Storage::disk('public')->exists($thumbPath)) {
            Storage::disk('public')->delete($thumbPath);
        }
    }

    private function encodeGdImage(\GdImage $img, bool $webp, int $quality): string
    {
        ob_start();
        if ($webp) {
            imagewebp($img, null, $quality);
        } else {
            imagejpeg($img, null, $quality);
        }

        return (string) ob_get_clean();
    }
}
