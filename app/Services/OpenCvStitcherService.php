<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use RuntimeException;
use Symfony\Component\Process\Process;

class OpenCvStitcherService
{
    /**
     * Stitch an array of raw overlapping photos into a seamless 4096x2048 4K equirectangular panorama
     * using server-side OpenCV 5.1 Full-Sphere Stitcher.
     *
     * @param  array<int, UploadedFile>  $frames
     * @return array{bytes:string,meta:array<string,mixed>}
     */
    public function stitchUploadedFrames(array $frames, ?string $posesJson = null): array
    {
        if (count($frames) < 2) {
            throw new RuntimeException('Minimal 2 foto diperlukan untuk proses jahit OpenCV 3D.');
        }

        $jobId = (string) Str::uuid();
        $workDir = storage_path("app/private/stitch_jobs/{$jobId}");
        $inputDir = "{$workDir}/frames";
        $outputPath = "{$workDir}/stitched.webp";
        $posesPath = "{$workDir}/poses.json";

        File::ensureDirectoryExists($inputDir);

        try {
            foreach (array_values($frames) as $index => $file) {
                $ext = strtolower($file->getClientOriginalExtension() ?: 'jpg');
                if (! in_array($ext, ['jpg', 'jpeg', 'png', 'webp'], true)) {
                    $ext = 'jpg';
                }
                $filename = sprintf('frame_%03d.%s', $index, $ext);
                $file->move($inputDir, $filename);
            }

            $cmd = [
                $this->pythonBinary(),
                base_path('scripts/opencv_stitcher.py'),
                '--input-dir',
                $inputDir,
                '--output',
                $outputPath,
            ];

            if ($posesJson !== null && trim($posesJson) !== '') {
                file_put_contents($posesPath, $posesJson);
                $cmd[] = '--poses';
                $cmd[] = $posesPath;
            }

            $process = new Process($cmd, base_path(), null, null, 120);
            $process->run();

            $stdout = trim($process->getOutput());
            $stderr = trim($process->getErrorOutput());

            if (! $process->isSuccessful() || ! file_exists($outputPath)) {
                $decoded = json_decode($stdout, true);
                $errMsg = $decoded['error'] ?? ($stderr ?: $stdout ?: 'Proses penjahitan OpenCV gagal.');
                throw new RuntimeException("OpenCV Stitcher error: {$errMsg}");
            }

            $meta = json_decode($stdout, true) ?: ['ok' => true, 'engine' => 'opencv'];
            Log::info('OpenCV Stitcher completed', $meta);
            $bytes = (string) file_get_contents($outputPath);

            return [
                'bytes' => $bytes,
                'meta' => $meta,
            ];
        } finally {
            File::deleteDirectory($workDir);
        }
    }

    private function pythonBinary(): string
    {
        $venvPython = base_path('.venv_stitcher/bin/python');
        if (file_exists($venvPython)) {
            return $venvPython;
        }

        return 'python3';
    }
}
