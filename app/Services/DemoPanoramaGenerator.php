<?php

namespace App\Services;

class DemoPanoramaGenerator
{
    /**
     * Generate a seamless 360-degree equirectangular panorama image (1600x800)
     * with matched room geometry between 'sebelum' (loading/setup) and 'sesudah' (final decor).
     */
    public function renderBytes(int $pinNumber, string $title, string $phase, string $angleLabel = 'Tampak Utama', int $yawShift = 0): string
    {
        $w = 1600;
        $h = 800;
        $img = imagecreatetruecolor($w, $h);
        imageantialias($img, true);

        $isAfter = $phase === 'sesudah';

        // Sky / ceiling & floor base gradient in equirectangular projection
        for ($y = 0; $y < $h; $y++) {
            $norm = $y / $h; // 0 top, 0.5 horizon, 1 bottom
            if ($norm < 0.48) {
                $t = $norm / 0.48;
                if ($isAfter) {
                    // Warm golden-ivory coffered ballroom ceiling
                    $r = (int) (46 + $t * 28);
                    $g = (int) (36 + $t * 22);
                    $b = (int) (28 + $t * 18);
                } else {
                    // Cool neutral preparation ceiling
                    $r = (int) (58 + $t * 24);
                    $g = (int) (64 + $t * 26);
                    $b = (int) (74 + $t * 28);
                }
            } elseif ($norm < 0.53) {
                // Distant wall horizon band
                if ($isAfter) {
                    $r = 72;
                    $g = 56;
                    $b = 42;
                } else {
                    $r = 92;
                    $g = 98;
                    $b = 106;
                }
            } else {
                $t = ($norm - 0.53) / 0.47;
                if ($isAfter) {
                    // Warm ballroom carpet / marble reflection
                    $r = (int) (68 - $t * 32);
                    $g = (int) (52 - $t * 24);
                    $b = (int) (40 - $t * 18);
                } else {
                    // Bare concrete / protective floor tarps
                    $r = (int) (88 - $t * 34);
                    $g = (int) (90 - $t * 34);
                    $b = (int) (94 - $t * 34);
                }
            }

            $col = imagecolorallocate($img, max(0, min(255, $r)), max(0, min(255, $g)), max(0, min(255, $b)));
            imageline($img, 0, $y, $w - 1, $y, $col);
        }

        // Seamless wrapping helper for X coordinates
        $wrapX = static fn (int $x): int => (($x % $w) + $w) % $w;
        $shift = (int) round(($yawShift / 360) * $w);

        // Draw architectural ballroom bays (12 columns around 360 degrees) - identical positions in sebelum & sesudah!
        $wallTop = (int) ($h * 0.25);
        $wallBottom = (int) ($h * 0.62);
        $bays = 12;
        $bayW = (int) ($w / $bays);

        for ($i = 0; $i < $bays; $i++) {
            $x1 = ($i * $bayW + $shift) % $w;
            $cx = ($x1 + (int) ($bayW / 2)) % $w;

            // Recessed wall panel / arch window
            $panelCol = $isAfter
                ? imagecolorallocate($img, 84, 65, 49)
                : imagecolorallocate($img, 108, 114, 122);
            $panelBorder = $isAfter
                ? imagecolorallocate($img, 184, 146, 84)
                : imagecolorallocate($img, 134, 140, 148);

            $px1 = $x1 + 18;
            $px2 = $x1 + $bayW - 18;
            $this->drawWrappedRect($img, $w, $px1, $wallTop + 18, $px2, $wallBottom - 18, $panelCol, $panelBorder);

            // Structural pillar between bays
            $pillarCol = $isAfter
                ? imagecolorallocate($img, 232, 220, 200)
                : imagecolorallocate($img, 148, 154, 162);
            $pillarTrim = $isAfter
                ? imagecolorallocate($img, 202, 165, 96)
                : imagecolorallocate($img, 116, 122, 130);
            $this->drawWrappedRect($img, $w, $x1 - 12, $wallTop - 10, $x1 + 12, $wallBottom + 10, $pillarCol, $pillarTrim);

            // Ceiling chandelier / work light in each alternating bay
            if ($i % 2 === 0) {
                if ($isAfter) {
                    $this->drawChandelier($img, $w, $cx, (int) ($h * 0.14));
                } else {
                    $this->drawWorkLight($img, $w, $cx, (int) ($h * 0.15));
                }
            }
        }

        // Floor perspective grid / aisle carpet (centered at azimuth 0 = w/2 + shift)
        $aisleCenter = $wrapX((int) ($w / 2) + $shift);
        if ($isAfter) {
            // Luxury champagne-burgundy aisle runner with golden trim
            $runnerCol = imagecolorallocate($img, 135, 36, 48);
            $goldTrim = imagecolorallocate($img, 214, 178, 102);
            $this->drawWrappedPolygon($img, $w, [
                $aisleCenter - 46, $wallBottom + 2,
                $aisleCenter + 46, $wallBottom + 2,
                $aisleCenter + 195, $h - 1,
                $aisleCenter - 195, $h - 1,
            ], $runnerCol, $goldTrim);

            // Subtle floor floral petals / candle glow along runner
            $candleGlow = imagecolorallocatealpha($img, 255, 224, 145, 45);
            for ($k = 1; $k <= 5; $k++) {
                $cy = $wallBottom + $k * 48;
                $spread = 48 + $k * 28;
                imagefilledellipse($img, $wrapX($aisleCenter - $spread), $cy, 18, 10, $candleGlow);
                imagefilledellipse($img, $wrapX($aisleCenter + $spread), $cy, 18, 10, $candleGlow);
            }
        } else {
            // Floor marking tape & rolled setup tarps in sebelum phase
            $tapeCol = imagecolorallocate($img, 240, 198, 66);
            $tarpCol = imagecolorallocate($img, 62, 102, 138);
            $this->drawWrappedPolygon($img, $w, [
                $aisleCenter - 44, $wallBottom + 2,
                $aisleCenter + 44, $wallBottom + 2,
                $aisleCenter + 185, $h - 1,
                $aisleCenter - 185, $h - 1,
            ], imagecolorallocate($img, 112, 115, 118), $tapeCol);

            // Rolled equipment / crate box on side
            $this->drawWrappedRect($img, $w, $aisleCenter - 260, $wallBottom + 18, $aisleCenter - 170, $wallBottom + 88, $tarpCol);
            $crateCol = imagecolorallocate($img, 146, 114, 78);
            $this->drawWrappedRect($img, $w, $aisleCenter + 180, $wallBottom + 12, $aisleCenter + 275, $wallBottom + 94, $crateCol);
        }

        // Focal installation depending on pinNumber (always centered around front azimuth!)
        $frontX = $wrapX((int) ($w / 2) + $shift);
        $backX = $wrapX($frontX + (int) ($w / 2));

        $this->drawPinFeature($img, $w, $h, $frontX, $wallTop, $wallBottom, $pinNumber, $isAfter);

        // Opposite-side architectural vista (doors / tables / guest foyer)
        $this->drawSecondaryVista($img, $w, $h, $backX, $wallTop, $wallBottom, $pinNumber, $isAfter);

        // Subtle atmospheric horizon banner plaque at high ceiling edge so testers immediately confirm Pin & Phase
        $badgeBg = $isAfter
            ? imagecolorallocatealpha($img, 18, 16, 14, 35)
            : imagecolorallocatealpha($img, 20, 28, 40, 35);
        $badgeText = $isAfter
            ? imagecolorallocate($img, 245, 224, 178)
            : imagecolorallocate($img, 226, 232, 240);
        $phaseLabel = $isAfter ? 'SESUDAH DEKORASI' : 'SEBELUM / PERSIAPAN';
        $labelText = sprintf('PIN %d · %s · %s (%s)', $pinNumber, mb_strtoupper($title), $phaseLabel, $angleLabel);

        imagefilledrectangle($img, max(0, $frontX - 240), $wallTop - 42, min($w - 1, $frontX + 240), $wallTop - 16, $badgeBg);
        imagestring($img, 3, max(10, $frontX - (int) (strlen($labelText) * 3.5)), $wallTop - 36, $labelText, $badgeText);

        ob_start();
        if (function_exists('imagewebp')) {
            imagewebp($img, null, 88);
        } else {
            imagejpeg($img, null, 88);
        }
        $bytes = (string) ob_get_clean();
        imagedestroy($img);

        return $bytes;
    }

    private function drawPinFeature(\GdImage $img, int $w, int $h, int $cx, int $wallTop, int $wallBottom, int $pinNumber, bool $isAfter): void
    {
        if ($isAfter) {
            $gold = imagecolorallocate($img, 218, 182, 108);
            $ivory = imagecolorallocate($img, 246, 241, 231);
            $floralPink = imagecolorallocate($img, 236, 172, 180);
            $floralWhite = imagecolorallocate($img, 252, 250, 245);
            $foliage = imagecolorallocate($img, 64, 110, 74);
            $darkWood = imagecolorallocate($img, 58, 40, 30);

            match ($pinNumber) {
                7 => $this->drawPelaminanAfter($img, $w, $cx, $wallTop, $wallBottom, $gold, $ivory, $floralPink, $floralWhite, $foliage),
                5 => $this->drawPergolaAfter($img, $w, $cx, $wallTop, $wallBottom, $gold, $foliage, $floralWhite, $floralPink),
                8 => $this->drawMusicStageAfter($img, $w, $cx, $wallTop, $wallBottom, $gold, $darkWood, $ivory),
                9 => $this->drawFrameScreenAfter($img, $w, $cx, $wallTop, $wallBottom, $gold, $ivory),
                10 => $this->drawVipTablesAfter($img, $w, $cx, $wallTop, $wallBottom, $gold, $ivory, $floralPink),
                3 => $this->drawPhotoGalleryAfter($img, $w, $cx, $wallTop, $wallBottom, $gold, $ivory, $foliage, $floralWhite),
                default => $this->drawFloralCenterpieceAfter($img, $w, $cx, $wallTop, $wallBottom, $gold, $ivory, $foliage, $floralPink, $floralWhite),
            };
        } else {
            // Bare aluminum truss, ladders, tape, unfinished platform
            $truss = imagecolorallocate($img, 182, 190, 198);
            $trussDark = imagecolorallocate($img, 118, 126, 136);
            $stageWood = imagecolorallocate($img, 152, 128, 96);
            $coneOrange = imagecolorallocate($img, 234, 112, 42);

            // Aluminum truss frame
            $this->drawWrappedRect($img, $w, $cx - 190, $wallTop + 10, $cx - 172, $wallBottom, $truss, $trussDark);
            $this->drawWrappedRect($img, $w, $cx + 172, $wallTop + 10, $cx + 190, $wallBottom, $truss, $trussDark);
            $this->drawWrappedRect($img, $w, $cx - 190, $wallTop + 10, $cx + 190, $wallTop + 28, $truss, $trussDark);

            // Bare plywood stage / desk
            $this->drawWrappedRect($img, $w, $cx - 140, $wallBottom - 44, $cx + 140, $wallBottom + 16, $stageWood, $trussDark);

            // Orange safety cones
            $this->drawWrappedPolygon($img, $w, [$cx - 210, $wallBottom + 24, $cx - 198, $wallBottom - 8, $cx - 186, $wallBottom + 24], $coneOrange);
            $this->drawWrappedPolygon($img, $w, [$cx + 186, $wallBottom + 24, $cx + 198, $wallBottom - 8, $cx + 210, $wallBottom + 24], $coneOrange);
        }
    }

    private function drawPelaminanAfter(\GdImage $img, int $w, int $cx, int $wallTop, int $wallBottom, int $gold, int $ivory, int $pink, int $white, int $green): void
    {
        // Grand multi-arch pelaminan stage
        $this->drawWrappedRect($img, $w, $cx - 240, $wallBottom - 30, $cx + 240, $wallBottom + 20, $ivory, $gold);
        $this->drawWrappedRect($img, $w, $cx - 205, $wallTop - 15, $cx + 205, $wallBottom - 30, $ivory, $gold);
        $this->drawWrappedRect($img, $w, $cx - 110, $wallTop + 12, $cx + 110, $wallBottom - 30, imagecolorallocate($img, 224, 198, 148), $gold);

        // Bridal sofa & floral crest
        $this->drawWrappedRect($img, $w, $cx - 56, $wallBottom - 78, $cx + 56, $wallBottom - 42, $ivory, $gold);
        for ($i = -180; $i <= 180; $i += 36) {
            $fx = (($cx + $i) % $w + $w) % $w;
            imagefilledellipse($img, $fx, $wallTop + 14 + (int) (abs($i) * 0.08), 38, 28, $green);
            imagefilledellipse($img, $fx - 8, $wallTop + 12 + (int) (abs($i) * 0.08), 20, 18, $white);
            imagefilledellipse($img, $fx + 10, $wallTop + 16 + (int) (abs($i) * 0.08), 16, 15, $pink);
        }
    }

    private function drawPergolaAfter(\GdImage $img, int $w, int $cx, int $wallTop, int $wallBottom, int $gold, int $green, int $white, int $pink): void
    {
        // 5x5m pergola pillars with hanging garden canopy
        $this->drawWrappedRect($img, $w, $cx - 165, $wallTop - 18, $cx - 142, $wallBottom + 10, $gold);
        $this->drawWrappedRect($img, $w, $cx + 142, $wallTop - 18, $cx + 165, $wallBottom + 10, $gold);
        $this->drawWrappedRect($img, $w, $cx - 175, $wallTop - 22, $cx + 175, $wallTop + 12, $green, $gold);
        for ($x = -150; $x <= 150; $x += 28) {
            $hx = (($cx + $x) % $w + $w) % $w;
            $drop = 48 + (($x * 7) % 35);
            imageline($img, $hx, $wallTop + 12, $hx, $wallTop + $drop, $green);
            imagefilledellipse($img, $hx, $wallTop + $drop, 14, 14, ($x % 56 === 0) ? $pink : $white);
        }
    }

    private function drawMusicStageAfter(\GdImage $img, int $w, int $cx, int $wallTop, int $wallBottom, int $gold, int $wood, int $ivory): void
    {
        $this->drawWrappedRect($img, $w, $cx - 175, $wallBottom - 26, $cx + 175, $wallBottom + 18, $wood, $gold);
        // Grand piano & acoustic backdrop
        $this->drawWrappedRect($img, $w, $cx - 150, $wallTop + 20, $cx + 150, $wallBottom - 26, imagecolorallocate($img, 36, 48, 42), $gold);
        $this->drawWrappedRect($img, $w, $cx - 60, $wallBottom - 78, $cx + 40, $wallBottom - 26, imagecolorallocate($img, 24, 24, 28), $gold);
        imagefilledellipse($img, (($cx + 85) % $w + $w) % $w, $wallBottom - 62, 26, 26, $ivory);
    }

    private function drawFrameScreenAfter(\GdImage $img, int $w, int $cx, int $wallTop, int $wallBottom, int $gold, int $ivory): void
    {
        // 3x5m LED multimedia frame
        $this->drawWrappedRect($img, $w, $cx - 165, $wallTop + 5, $cx + 165, $wallBottom - 18, $gold);
        $screenGlow = imagecolorallocate($img, 226, 152, 92);
        $this->drawWrappedRect($img, $w, $cx - 150, $wallTop + 20, $cx + 150, $wallBottom - 32, $screenGlow, $ivory);
    }

    private function drawVipTablesAfter(\GdImage $img, int $w, int $cx, int $wallTop, int $wallBottom, int $gold, int $ivory, int $pink): void
    {
        foreach ([-180, 0, 180] as $offset) {
            $tx = (($cx + $offset) % $w + $w) % $w;
            $this->drawWrappedRect($img, $w, $tx - 65, $wallBottom - 16, $tx + 65, $wallBottom + 36, $ivory, $gold);
            imagefilledellipse($img, $tx, $wallBottom - 30, 36, 24, $pink);
        }
    }

    private function drawPhotoGalleryAfter(\GdImage $img, int $w, int $cx, int $wallTop, int $wallBottom, int $gold, int $ivory, int $green, int $white): void
    {
        foreach ([-130, 0, 130] as $offset) {
            $fx = (($cx + $offset) % $w + $w) % $w;
            $this->drawWrappedRect($img, $w, $fx - 42, $wallTop + 28, $fx + 42, $wallBottom - 54, $ivory, $gold);
            $this->drawWrappedRect($img, $w, $fx - 30, $wallTop + 40, $fx + 30, $wallBottom - 68, imagecolorallocate($img, 210, 194, 178));
        }
        $this->drawWrappedRect($img, $w, $cx - 140, $wallBottom - 40, $cx + 140, $wallBottom + 8, $ivory, $gold);
        imagefilledellipse($img, $cx, $wallBottom - 52, 48, 28, $green);
        imagefilledellipse($img, $cx, $wallBottom - 56, 30, 20, $white);
    }

    private function drawFloralCenterpieceAfter(\GdImage $img, int $w, int $cx, int $wallTop, int $wallBottom, int $gold, int $ivory, int $green, int $pink, int $white): void
    {
        // Console / angpao welcome desk or grand floral centerpiece
        $this->drawWrappedRect($img, $w, $cx - 125, $wallBottom - 48, $cx + 125, $wallBottom + 12, $ivory, $gold);
        imagefilledellipse($img, $cx, $wallBottom - 82, 118, 72, $green);
        imagefilledellipse($img, $cx - 28, $wallBottom - 92, 54, 42, $white);
        imagefilledellipse($img, $cx + 26, $wallBottom - 88, 48, 38, $pink);
        imagefilledellipse($img, $cx, $wallBottom - 108, 46, 34, $white);
    }

    private function drawSecondaryVista(\GdImage $img, int $w, int $h, int $bx, int $wallTop, int $wallBottom, int $pinNumber, bool $isAfter): void
    {
        $doorCol = $isAfter
            ? imagecolorallocate($img, 112, 82, 54)
            : imagecolorallocate($img, 96, 102, 110);
        $trimCol = $isAfter
            ? imagecolorallocate($img, 214, 178, 102)
            : imagecolorallocate($img, 140, 146, 152);
        $this->drawWrappedRect($img, $w, $bx - 64, $wallTop + 32, $bx + 64, $wallBottom, $doorCol, $trimCol);
    }

    private function drawChandelier(\GdImage $img, int $w, int $cx, int $cy): void
    {
        $cx = (($cx % $w) + $w) % $w;
        $glow = imagecolorallocatealpha($img, 255, 224, 156, 62);
        $crystal = imagecolorallocate($img, 255, 245, 214);
        $gold = imagecolorallocate($img, 214, 176, 98);
        imagefilledellipse($img, $cx, $cy, 128, 72, $glow);
        imagefilledellipse($img, $cx, $cy, 58, 32, $crystal);
        imageline($img, $cx, 0, $cx, $cy - 16, $gold);
    }

    private function drawWorkLight(\GdImage $img, int $w, int $cx, int $cy): void
    {
        $cx = (($cx % $w) + $w) % $w;
        $tube = imagecolorallocate($img, 226, 240, 255);
        $frame = imagecolorallocate($img, 130, 140, 152);
        $this->drawWrappedRect($img, $w, $cx - 38, $cy - 6, $cx + 38, $cy + 6, $tube, $frame);
    }

    private function drawWrappedRect(\GdImage $img, int $w, int $x1, int $y1, int $x2, int $y2, int $fillCol, ?int $borderCol = null): void
    {
        $wx1 = (($x1 % $w) + $w) % $w;
        $width = $x2 - $x1;
        if ($width <= 0) {
            return;
        }
        $wx2 = $wx1 + $width;
        if ($wx2 < $w) {
            imagefilledrectangle($img, $wx1, $y1, $wx2, $y2, $fillCol);
            if ($borderCol !== null) {
                imagerectangle($img, $wx1, $y1, $wx2, $y2, $borderCol);
            }
        } else {
            imagefilledrectangle($img, $wx1, $y1, $w - 1, $y2, $fillCol);
            imagefilledrectangle($img, 0, $y1, $wx2 - $w, $y2, $fillCol);
        }
    }

    private function drawWrappedPolygon(\GdImage $img, int $w, array $points, int $fillCol, ?int $borderCol = null): void
    {
        $count = (int) (count($points) / 2);
        $shifted = [];
        for ($i = 0; $i < count($points); $i += 2) {
            $shifted[] = (($points[$i] % $w) + $w) % $w;
            $shifted[] = $points[$i + 1];
        }
        // Only draw if it doesn't wrap wildly across canvas width
        $xs = array_filter($shifted, fn ($v, $k) => $k % 2 === 0, ARRAY_FILTER_USE_BOTH);
        if (max($xs) - min($xs) < $w * 0.6) {
            imagefilledpolygon($img, $shifted, $fillCol);
            if ($borderCol !== null) {
                imagepolygon($img, $shifted, $borderCol);
            }
        }
    }
}
