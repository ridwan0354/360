<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Floorplan;
use App\Models\LocationPin;
use App\Models\NavigationLink;
use App\Models\PanoramaPhoto;
use App\Models\User;
use App\Services\DemoPanoramaGenerator;
use App\Services\PanoramaImageService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $panoramaService = app(PanoramaImageService::class);
        $demoGenerator = app(DemoPanoramaGenerator::class);

        // 1. Seed Users (Admin Utama & Kru Lapangan)
        $admin = User::updateOrCreate(
            ['email' => 'admin@ruang360.test'],
            [
                'name' => 'Admin Utama Azka Anggun',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'is_active' => true,
            ]
        );

        $kru1 = User::updateOrCreate(
            ['email' => 'kru@ruang360.test'],
            [
                'name' => 'Raka Pratama (Kru Lapangan)',
                'password' => Hash::make('password'),
                'role' => 'kru',
                'is_active' => true,
            ]
        );

        $kru2 = User::updateOrCreate(
            ['email' => 'kru2@ruang360.test'],
            [
                'name' => 'Sinta Wulandari (Kru Dekorasi)',
                'password' => Hash::make('password'),
                'role' => 'kru',
                'is_active' => true,
            ]
        );

        // Clean existing demo data if re-seeding
        if (Event::where('public_slug', 'shila-rafi-opus-tribrata')->exists()) {
            return;
        }

        // 2. Seed Primary Demo Event using the sample floorplan image in project root
        $sampleFloorplanPath = base_path('WhatsApp Image 2026-11-27 at 15.25.38.jpeg');
        $event = Event::create([
            'title' => 'Shila & Rafi — Royal Wedding',
            'event_date' => '2026-11-29',
            'venue_name' => 'Opus Grand Ballroom, The Tribrata',
            'organizer_name' => 'Azka Anggun Art',
            'description' => 'Tur virtual 360° tata letak dan dekorasi resepsi pernikahan Shila & Rafi di Opus Grand Ballroom The Tribrata, lengkap dengan perbandingan kondisi loading/sebelum dan hasil akhir dekorasi.',
            'public_slug' => 'shila-rafi-opus-tribrata',
            'status' => 'berlangsung',
            'created_by' => $admin->id,
        ]);

        $event->crew()->sync([$kru1->id, $kru2->id]);

        $sampleBytes = file_exists($sampleFloorplanPath) ? @file_get_contents($sampleFloorplanPath) : false;
        if ($sampleBytes === false) {
            $fallbackFloorplanPath = database_path('seeders/assets/shila_rafi_floorplan.png');
            $sampleBytes = file_exists($fallbackFloorplanPath) ? @file_get_contents($fallbackFloorplanPath) : false;
        }

        $floorplanInfo = is_string($sampleBytes) && $sampleBytes !== ''
            ? $panoramaService->storeFloorplanImage($event->id, $sampleBytes)
            : ['image_path' => null, 'width' => 1599, 'height' => 899];

        $floorplan = Floorplan::create([
            'event_id' => $event->id,
            'source_type' => 'upload',
            'image_path' => $floorplanInfo['image_path'],
            'width' => $floorplanInfo['width'],
            'height' => $floorplanInfo['height'],
        ]);

        // Exact coordinates extracted from the 10 blue markers in WhatsApp Image 2026-11-27 at 15.25.38.jpeg
        $pinsData = [
            [
                'pin_number' => 1,
                'title' => 'Area Penerima Tamu',
                'dimensions_note' => 'Background penerima tamu, kotak angpao, bunga, rak souvenir',
                'description' => 'Meja registrasi tamu utama tepat di pintu masuk Opus Grand Ballroom dengan backdrop dekorasi bunga segar, kotak angpao, serta rak souvenir tertata rapi.',
                'pos_x' => 47.91,
                'pos_y' => 67.16,
            ],
            [
                'pin_number' => 2,
                'title' => 'Centerpiece',
                'dimensions_note' => 'Rangkaian bunga besar yang digunakan sebagai photo gallery dan area selfie',
                'description' => 'Instalasi bunga centerpiece berukuran besar di area pre-function foyer yang menjadi titik penyambutan pertama sekaligus spot swafoto tamu undangan.',
                'pos_x' => 47.89,
                'pos_y' => 73.28,
            ],
            [
                'pin_number' => 3,
                'title' => 'Photo Gallery',
                'dimensions_note' => 'Meja Konsul & Rangkaian bunga',
                'description' => 'Lorong galeri foto pre-wedding di sisi kiri foyer dekat area Lift, dilengkapi meja konsul bergaya klasik dan rangkaian bunga artistik.',
                'pos_x' => 43.51,
                'pos_y' => 73.09,
            ],
            [
                'pin_number' => 4,
                'title' => 'Penerima Tamu VIP',
                'dimensions_note' => 'Meja khusus tamu VIP & keluarga besar',
                'description' => 'Pos penerima tamu khusus VIP dan keluarga inti di sisi kanan koridor masuk untuk mempercepat alur registrasi prioritas.',
                'pos_x' => 55.45,
                'pos_y' => 72.07,
            ],
            [
                'pin_number' => 5,
                'title' => 'Pergola / Gazebo / Wedding Gate',
                'dimensions_note' => 'Pergola 5x5m dengan hanging garden',
                'description' => 'Gerbang masuk utama ke ruang ballroom berupa pergola ukuran 5x5 meter bermahkota taman gantung floral sebelum memasuki karpet prosesi.',
                'pos_x' => 55.41,
                'pos_y' => 64.35,
            ],
            [
                'pin_number' => 6,
                'title' => 'Standing Flower',
                'dimensions_note' => 'Deretan standing flower sepanjang karpet prosesi pengantin',
                'description' => 'Titik tengah lorong prosesi menuju panggung utama, diapit deretan standing flower mewah dan pencahayaan hangat.',
                'pos_x' => 55.40,
                'pos_y' => 58.31,
            ],
            [
                'pin_number' => 7,
                'title' => 'Area Pelaminan',
                'dimensions_note' => 'Panggung pelaminan utama dengan backdrop floral megah & kristal',
                'description' => 'Pusat acara di sisi utara Opus Grand Ballroom. Menampilkan desain pelaminan klasik modern dengan komposisi bunga putih-pastel dan pencahayaan hangat.',
                'pos_x' => 55.62,
                'pos_y' => 47.29,
            ],
            [
                'pin_number' => 8,
                'title' => 'Area Musik',
                'dimensions_note' => 'Panggung band akustik & grand piano di dekat area FOH',
                'description' => 'Area hiburan musik live di sisi kiri ballroom tepat di sebelah pos FOH untuk mengiringi jalannya resepsi.',
                'pos_x' => 41.67,
                'pos_y' => 56.73,
            ],
            [
                'pin_number' => 9,
                'title' => 'Frame Screen',
                'dimensions_note' => 'Ukuran Frame 3x5m, screen dari foto/video',
                'description' => 'Layar LED multimedia berbingkai dekoratif ukuran 3x5 meter yang menampilkan dokumentasi langsung serta video perjalanan pasangan.',
                'pos_x' => 42.26,
                'pos_y' => 48.80,
            ],
            [
                'pin_number' => 10,
                'title' => 'Area VIP, VVIP',
                'dimensions_note' => 'Pagar pembatas kayu champagne dengan meja jamuan bundar',
                'description' => 'Zona jamuan duduk VIP & VVIP di sayap kanan ballroom yang dipisahkan dengan pagar pembatas kayu berwarna champagne.',
                'pos_x' => 62.14,
                'pos_y' => 56.52,
            ],
        ];

        $pinsByNumber = [];
        $primaryPhotosByPinNumber = [];

        foreach ($pinsData as $pinItem) {
            $pin = LocationPin::create([
                'floorplan_id' => $floorplan->id,
                ...$pinItem,
            ]);
            $pinsByNumber[$pin->pin_number] = $pin;

            // Create both 'sebelum' and 'sesudah' 360 panoramas for every single pin
            foreach (['sebelum', 'sesudah'] as $phase) {
                $bytes = $demoGenerator->renderBytes($pin->pin_number, $pin->title, $phase, 'Tampak Utama', 0);
                $stored = $panoramaService->processAndSaveBytes($event->id, $bytes);

                $photo = PanoramaPhoto::create([
                    'pin_id' => $pin->id,
                    'phase' => $phase,
                    'angle_label' => 'Tampak Utama',
                    'image_path' => $stored['image_path'],
                    'thumb_path' => $stored['thumb_path'],
                    'initial_yaw' => 0,
                    'file_size' => $stored['file_size'],
                    'created_by' => $kru1->id,
                ]);

                $primaryPhotosByPinNumber[$pin->pin_number][$phase][] = $photo;
            }

            // Add multi-angle shots on signature areas (Pin 1, Pin 5, Pin 7, Pin 10)
            if (in_array($pin->pin_number, [1, 5, 7, 10], true)) {
                foreach (['sebelum', 'sesudah'] as $phase) {
                    $bytes = $demoGenerator->renderBytes($pin->pin_number, $pin->title, $phase, 'Sudut Samping Kanan', 85);
                    $stored = $panoramaService->processAndSaveBytes($event->id, $bytes);

                    PanoramaPhoto::create([
                        'pin_id' => $pin->id,
                        'phase' => $phase,
                        'angle_label' => 'Sudut Samping Kanan',
                        'image_path' => $stored['image_path'],
                        'thumb_path' => $stored['thumb_path'],
                        'initial_yaw' => 85,
                        'file_size' => $stored['file_size'],
                        'created_by' => $kru2->id,
                    ]);
                }
            }
        }

        // Connect spatial navigation arrows across adjacent pins (both phases!)
        $graph = [
            1 => [[2, 180, -6, 'Keluar ke Centerpiece'], [5, 25, -5, 'Masuk ke Pergola Gate']],
            2 => [[1, 0, -5, 'Menuju Area Penerima Tamu'], [3, -82, -6, 'Ke Photo Gallery'], [4, 78, -6, 'Ke Penerima Tamu VIP']],
            3 => [[2, 92, -6, 'Kembali ke Centerpiece'], [1, 45, -5, 'Ke Penerima Tamu']],
            4 => [[2, -90, -6, 'Ke Centerpiece'], [5, 0, -5, 'Masuk Ballroom (Pergola)']],
            5 => [[6, 0, -6, 'Maju ke Standing Flower'], [1, -48, -6, 'Ke Penerima Tamu'], [8, -72, -5, 'Ke Area Musik']],
            6 => [[7, 0, -4, 'Menuju Area Pelaminan'], [5, 180, -6, 'Kembali ke Pergola Gate'], [10, 88, -6, 'Ke Area VIP & VVIP']],
            7 => [[6, 180, -8, 'Turun ke Standing Flower'], [8, -125, -6, 'Ke Area Musik & FOH'], [10, 120, -6, 'Ke Area VIP & VVIP']],
            8 => [[9, -15, -5, 'Menuju Frame Screen 3x5m'], [5, 95, -6, 'Ke Pergola Gate'], [7, 45, -5, 'Pandangan ke Pelaminan']],
            9 => [[8, 170, -6, 'Ke Area Musik'], [7, 80, -5, 'Menuju Area Pelaminan']],
            10 => [[6, -92, -6, 'Ke Tengah Ballroom'], [7, -45, -5, 'Menuju Pelaminan']],
        ];

        foreach ($graph as $fromPinNum => $edges) {
            foreach (['sebelum', 'sesudah'] as $phase) {
                $fromPhoto = $primaryPhotosByPinNumber[$fromPinNum][$phase][0] ?? null;
                if (! $fromPhoto) {
                    continue;
                }
                foreach ($edges as [$toPinNum, $yaw, $pitch, $label]) {
                    NavigationLink::create([
                        'from_photo_id' => $fromPhoto->id,
                        'to_pin_id' => $pinsByNumber[$toPinNum]->id,
                        'yaw' => $yaw,
                        'pitch' => $pitch,
                        'label' => $label,
                    ]);
                }
            }
        }

        // 3. Seed a Second Demo Event using Canvas Builder mode (Corporate Gala / Pameran)
        $corpEvent = Event::create([
            'title' => 'Nusantara Tech Summit & Expo 2026',
            'event_date' => '2026-12-12',
            'venue_name' => 'Hall B Jakarta Convention Center',
            'organizer_name' => 'Karsa Kreasi Events',
            'description' => 'Contoh event kedua menggunakan mode Pembuat Denah (Canvas Builder) interaktif untuk pameran dan konferensi teknologi.',
            'public_slug' => 'nusantara-tech-expo-2026',
            'status' => 'persiapan',
            'created_by' => $admin->id,
        ]);

        $corpEvent->crew()->sync([$kru1->id]);

        $builderJson = json_encode([
            'width' => 1200,
            'height' => 760,
            'background' => '#F8FAFC',
            'items' => [
                ['id' => 'room-1', 'type' => 'room', 'x' => 110, 'y' => 90, 'width' => 980, 'height' => 560, 'label' => 'Main Exhibition Hall', 'fill' => '#FFFFFF', 'stroke' => '#1E293B'],
                ['id' => 'icon-stage', 'type' => 'icon', 'iconKind' => 'panggung_musik', 'x' => 520, 'y' => 130, 'width' => 170, 'height' => 70, 'label' => 'Main Keynote Stage'],
                ['id' => 'icon-vip', 'type' => 'icon', 'iconKind' => 'meja_vip', 'x' => 780, 'y' => 300, 'width' => 150, 'height' => 100, 'label' => 'VIP Lounge'],
                ['id' => 'icon-reg', 'type' => 'icon', 'iconKind' => 'penerima_tamu', 'x' => 520, 'y' => 540, 'width' => 160, 'height' => 60, 'label' => 'Registrasi Utama'],
                ['id' => 'door-in', 'type' => 'door_in', 'x' => 560, 'y' => 642, 'width' => 80, 'height' => 16, 'label' => 'Pintu Masuk'],
            ],
        ]);

        // Render clean builder snapshot PNG
        $canvasImg = imagecreatetruecolor(1200, 760);
        $bg = imagecolorallocate($canvasImg, 248, 250, 252);
        imagefill($canvasImg, 0, 0, $bg);
        $hallFill = imagecolorallocate($canvasImg, 255, 255, 255);
        $navy = imagecolorallocate($canvasImg, 30, 41, 59);
        $gold = imagecolorallocate($canvasImg, 200, 157, 84);
        $emerald = imagecolorallocate($canvasImg, 16, 185, 129);
        $blueSoft = imagecolorallocate($canvasImg, 239, 246, 255);
        imagefilledrectangle($canvasImg, 110, 90, 1090, 650, $hallFill);
        imagerectangle($canvasImg, 110, 90, 1090, 650, $navy);
        imagefilledrectangle($canvasImg, 500, 125, 700, 205, $navy);
        imagestring($canvasImg, 4, 535, 158, 'MAIN STAGE', $hallFill);
        imagefilledrectangle($canvasImg, 770, 290, 950, 410, $blueSoft);
        imagerectangle($canvasImg, 770, 290, 950, 410, $gold);
        imagestring($canvasImg, 4, 815, 342, 'VIP LOUNGE', $navy);
        imagefilledrectangle($canvasImg, 500, 530, 700, 595, $blueSoft);
        imagerectangle($canvasImg, 500, 530, 700, 595, $navy);
        imagestring($canvasImg, 4, 540, 555, 'REGISTRASI', $navy);
        imagefilledrectangle($canvasImg, 550, 642, 650, 658, $emerald);
        imagestring($canvasImg, 4, 480, 35, 'DENAH NUSANTARA TECH EXPO 2026', $navy);

        ob_start();
        imagepng($canvasImg);
        $corpFloorBytes = (string) ob_get_clean();
        imagedestroy($canvasImg);

        $corpFloorStored = $panoramaService->storeFloorplanImage($corpEvent->id, $corpFloorBytes);
        $corpFloorplan = Floorplan::create([
            'event_id' => $corpEvent->id,
            'source_type' => 'builder',
            'image_path' => $corpFloorStored['image_path'],
            'canvas_json' => $builderJson,
            'width' => 1200,
            'height' => 760,
        ]);

        $corpPin1 = LocationPin::create([
            'floorplan_id' => $corpFloorplan->id,
            'pin_number' => 1,
            'title' => 'Meja Registrasi Utama',
            'dimensions_note' => 'Booth Registrasi QR 6x2m',
            'description' => 'Area check-in peserta di pintu masuk utama Hall B.',
            'pos_x' => 50.00,
            'pos_y' => 74.00,
        ]);
        $corpPin2 = LocationPin::create([
            'floorplan_id' => $corpFloorplan->id,
            'pin_number' => 2,
            'title' => 'Main Keynote Stage',
            'dimensions_note' => 'Panggung Utama 12x6m + LED Panorama',
            'description' => 'Panggung utama konferensi dengan tata cahaya penuh.',
            'pos_x' => 50.00,
            'pos_y' => 22.00,
        ]);
        $corpPin3 = LocationPin::create([
            'floorplan_id' => $corpFloorplan->id,
            'pin_number' => 3,
            'title' => 'VIP Networking Lounge',
            'dimensions_note' => 'Sofa lounge 8x6m',
            'description' => 'Area eksklusif pembicara dan tamu VIP.',
            'pos_x' => 72.00,
            'pos_y' => 46.00,
        ]);

        // Seed hanya fase 'sebelum' di event kedua agar kelihatan status progres sebagian terisi (1/3 sesudah, 2/3 sebelum)
        foreach ([$corpPin1, $corpPin2] as $cp) {
            $bytes = $demoGenerator->renderBytes($cp->pin_number, $cp->title, 'sebelum', 'Tampak Utama', 0);
            $stored = $panoramaService->processAndSaveBytes($corpEvent->id, $bytes);
            PanoramaPhoto::create([
                'pin_id' => $cp->id,
                'phase' => 'sebelum',
                'angle_label' => 'Tampak Utama',
                'image_path' => $stored['image_path'],
                'thumb_path' => $stored['thumb_path'],
                'initial_yaw' => 0,
                'file_size' => $stored['file_size'],
                'created_by' => $kru1->id,
            ]);
        }

        // Also seed a subtle gentle ambient chord WAV file inside storage/app/public/demo/ambient-wedding.wav
        // and attach it to Shila & Rafi event so background music works out-of-the-box!
        $wavPath = 'events/'.$event->id.'/audio/wedding-ambient.wav';
        Storage::disk('public')->put($wavPath, $this->generateGentleAmbientWav());
        $event->update(['bg_music_path' => $wavPath]);
    }

    private function generateGentleAmbientWav(): string
    {
        $sampleRate = 16000;
        $duration = 8; // 8-second seamless loop
        $numSamples = $sampleRate * $duration;
        $dataSize = $numSamples * 2; // 16-bit mono

        $header = pack(
            'A4VA4A4VvvVVvvA4V',
            'RIFF',
            36 + $dataSize,
            'WAVE',
            'fmt ',
            16,
            1, // PCM
            1, // mono
            $sampleRate,
            $sampleRate * 2,
            2,
            16,
            'data',
            $dataSize
        );

        // Warm soft major9 arpeggiated pad frequencies (C4, E4, G4, B4, D5)
        $freqs = [261.63, 329.63, 392.00, 493.88];
        $samples = '';
        for ($i = 0; $i < $numSamples; $i++) {
            $t = $i / $sampleRate;
            $env = 0.5 - 0.5 * cos(2 * M_PI * $t / $duration); // smooth fade in/out for seamless looping
            $val = 0.0;
            foreach ($freqs as $idx => $f) {
                $swell = 0.65 + 0.35 * sin(2 * M_PI * ($t / 4.0 + $idx * 0.25));
                $val += sin(2 * M_PI * $f * $t) * $swell;
            }
            $sample = (int) max(-32767, min(32767, $val * 1400 * $env));
            $samples .= pack('s', $sample);
        }

        return $header.$samples;
    }
}
