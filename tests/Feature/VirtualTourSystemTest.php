<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\Floorplan;
use App\Models\LocationPin;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class VirtualTourSystemTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_showcase_and_tour_accessible_without_login(): void
    {
        Storage::fake('public');
        $this->seed();

        $this->get('/')
            ->assertOk()
            ->assertSee('Shila & Rafi');

        $event = Event::where('public_slug', 'shila-rafi-opus-tribrata')->firstOrFail();

        $this->get(route('tour.show', $event->public_slug))
            ->assertOk()
            ->assertSee('Opus Grand Ballroom');

        $this->getJson(route('tour.data', $event->public_slug))
            ->assertOk()
            ->assertJsonCount(10, 'pins')
            ->assertJsonPath('pins.0.title', 'Area Penerima Tamu');
    }

    public function test_admin_can_create_event_pins_upload_panorama_and_download_qr(): void
    {
        Storage::fake('public');

        $admin = User::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.local',
            'password' => Hash::make('secret123'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        $this->actingAs($admin)
            ->post(route('admin.events.store'), [
                'title' => 'Gala Dinner Test',
                'venue_name' => 'Grand Ballroom Test',
                'status' => 'persiapan',
            ])
            ->assertRedirect();

        $event = Event::where('title', 'Gala Dinner Test')->firstOrFail();

        // Download QR SVG & PNG
        $svgResponse = $this->actingAs($admin)->get(route('admin.events.qr', ['event' => $event, 'format' => 'svg']));
        $svgResponse->assertOk();
        $this->assertStringContainsString('<svg', $svgResponse->getContent());

        $pngResponse = $this->actingAs($admin)->get(route('admin.events.qr', ['event' => $event, 'format' => 'png']));
        $pngResponse->assertOk();
        $this->assertTrue(str_starts_with($pngResponse->getContent(), "\x89PNG"));

        // Save builder floorplan
        $tinyPng = base64_encode($this->createPngBytes(120, 80));
        $this->actingAs($admin)
            ->postJson(route('admin.floorplan.builder', $event), [
                'canvas_json' => json_encode(['items' => []]),
                'snapshot_data_url' => 'data:image/png;base64,'.$tinyPng,
            ])
            ->assertOk()
            ->assertJsonPath('source_type', 'builder');

        // Create Pin
        $pinResp = $this->actingAs($admin)
            ->postJson(route('admin.pins.store', $event), [
                'pin_number' => 1,
                'title' => 'Area Panggung',
                'pos_x' => 52.5,
                'pos_y' => 30.25,
            ])
            ->assertCreated();

        $pinId = $pinResp->json('pin.id');

        // Upload Panorama photo
        $panoFile = UploadedFile::fake()->createWithContent('pano.png', $this->createPngBytes(400, 200));

        $this->actingAs($admin)
            ->postJson(route('admin.pins.photos.store', $pinId), [
                'phase' => 'sesudah',
                'angle_label' => 'Tampak Depan',
                'photo' => $panoFile,
            ])
            ->assertCreated()
            ->assertJsonPath('photo.phase', 'sesudah');

        $this->assertDatabaseCount('panorama_photos', 1);
    }

    public function test_crew_access_control_and_stitched_360_capture(): void
    {
        Storage::fake('public');

        $kruAssigned = User::create([
            'name' => 'Kru Aktif',
            'email' => 'kru1@test.local',
            'password' => Hash::make('secret123'),
            'role' => 'kru',
            'is_active' => true,
        ]);

        $kruUnassigned = User::create([
            'name' => 'Kru Lain',
            'email' => 'kru2@test.local',
            'password' => Hash::make('secret123'),
            'role' => 'kru',
            'is_active' => true,
        ]);

        $event = Event::create([
            'title' => 'Event Kru Test',
            'venue_name' => 'Hall A',
            'status' => 'berlangsung',
        ]);
        $event->crew()->sync([$kruAssigned->id]);

        $floorplan = Floorplan::create([
            'event_id' => $event->id,
            'source_type' => 'upload',
            'image_path' => 'dummy.png',
        ]);

        $pin = LocationPin::create([
            'floorplan_id' => $floorplan->id,
            'pin_number' => 1,
            'title' => 'Pintu Masuk',
            'pos_x' => 45,
            'pos_y' => 60,
        ]);

        // Unassigned crew cannot access event floorplan or pin capture
        $this->actingAs($kruUnassigned)
            ->get(route('kru.events.show', $event))
            ->assertForbidden();

        // Assigned crew can open floorplan & capture page and save stitched 360 data URL
        $this->actingAs($kruAssigned)
            ->get(route('kru.pins.capture', $pin))
            ->assertOk();

        $dataUrl = 'data:image/png;base64,'.base64_encode($this->createPngBytes(400, 200));
        $this->actingAs($kruAssigned)
            ->postJson(route('kru.pins.photos.store', $pin), [
                'phase' => 'sebelum',
                'angle_label' => 'Hasil Scan Kamera',
                'panorama_data_url' => $dataUrl,
            ])
            ->assertCreated();

        $this->assertDatabaseHas('panorama_photos', [
            'pin_id' => $pin->id,
            'phase' => 'sebelum',
            'angle_label' => 'Hasil Scan Kamera',
        ]);
    }

    public function test_admin_crew_management_navigation_links_and_dashboard_pages(): void
    {
        Storage::fake('public');
        $this->seed();

        $admin = User::where('role', 'admin')->firstOrFail();
        $kru = User::where('role', 'kru')->firstOrFail();
        $event = Event::where('public_slug', 'shila-rafi-opus-tribrata')->firstOrFail();

        $this->actingAs($admin)
            ->get(route('admin.dashboard'))
            ->assertOk()
            ->assertSee($event->title);

        $this->actingAs($admin)
            ->get(route('admin.floorplan.edit', $event))
            ->assertOk()
            ->assertSee('Editor Denah');

        $this->actingAs($admin)
            ->get(route('admin.crew.index'))
            ->assertOk()
            ->assertSee($kru->name);

        // Toggle crew inactive & verify middleware blocks access
        $this->actingAs($admin)
            ->patch(route('admin.crew.toggle', $kru))
            ->assertRedirect();

        $kru->refresh();
        $this->assertFalse($kru->is_active);

        $this->actingAs($kru)
            ->get(route('kru.dashboard'))
            ->assertRedirect(route('login'));

        // Add navigation link between pin 1 photo and pin 2
        $pin1 = $event->floorplan->pins()->where('pin_number', 1)->firstOrFail();
        $pin2 = $event->floorplan->pins()->where('pin_number', 2)->firstOrFail();
        $photo1 = $pin1->photos()->firstOrFail();

        $this->actingAs($admin)
            ->postJson(route('admin.photos.links.store', $photo1), [
                'to_pin_id' => $pin2->id,
                'yaw' => 120.5,
                'pitch' => -5.0,
                'label' => 'Test Panah',
            ])
            ->assertCreated()
            ->assertJsonPath('link.label', 'Test Panah');
    }

    public function test_mobile_sanctum_api_login_events_and_opencv_stitch_endpoint(): void
    {
        Storage::fake('public');
        $this->seed();

        $loginResp = $this->postJson('/api/login', [
            'email' => 'kru@ruang360.test',
            'password' => 'password',
        ])->assertOk();

        $token = $loginResp->json('token');
        $this->assertNotEmpty($token);

        $this->withToken($token)
            ->getJson('/api/events')
            ->assertOk()
            ->assertJsonCount(2, 'events');

        $eventId = Event::where('public_slug', 'shila-rafi-opus-tribrata')->firstOrFail()->id;
        $detailResp = $this->withToken($token)
            ->getJson("/api/events/{$eventId}")
            ->assertOk()
            ->assertJsonCount(10, 'pins');

        $pinId = $detailResp->json('pins.0.id');

        // Build 2 overlapping textured frames and test server-side OpenCV stitching + preview confirm save
        $frameA = UploadedFile::fake()->createWithContent('frame_000.jpg', $this->createTexturedFrame(0));
        $frameB = UploadedFile::fake()->createWithContent('frame_001.jpg', $this->createTexturedFrame(120));

        $stitchResp = $this->withToken($token)
            ->post("/api/pins/{$pinId}/stitch", [
                'phase' => 'sesudah',
                'angle_label' => 'API OpenCV Test',
                'preview_only' => '1',
                'frames' => [$frameA, $frameB],
            ], ['Accept' => 'application/json'])
            ->assertOk();

        $previewToken = $stitchResp->json('preview_token');
        $this->assertNotEmpty($previewToken);

        $this->withToken($token)
            ->postJson("/api/pins/{$pinId}/photos", [
                'phase' => 'sesudah',
                'angle_label' => 'API OpenCV Test',
                'preview_token' => $previewToken,
            ])
            ->assertCreated()
            ->assertJsonPath('photo.angle_label', 'API OpenCV Test');
    }

    public function test_deleting_pin_automatically_resequences_remaining_pin_numbers(): void
    {
        $this->seed();
        $admin = User::where('role', 'admin')->firstOrFail();
        $event = Event::where('public_slug', 'shila-rafi-opus-tribrata')->firstOrFail();
        $pin2 = $event->floorplan->pins()->where('pin_number', 2)->firstOrFail();

        $resp = $this->actingAs($admin)
            ->deleteJson(route('admin.pins.destroy', $pin2))
            ->assertOk()
            ->assertJsonCount(9, 'pins');

        $numbers = collect($resp->json('pins'))->pluck('pin_number')->all();
        $this->assertSame(range(1, 9), $numbers);
    }

    public function test_cloudflare_flexible_forwarded_proto_generates_https_without_redirect_loop(): void
    {
        $this->seed();
        $event = Event::where('public_slug', 'shila-rafi-opus-tribrata')->firstOrFail();

        $this->withServerVariables(['HTTP_X_FORWARDED_PROTO' => 'https'])
            ->get("http://360.galipatsistem.com/tour/{$event->public_slug}")
            ->assertOk()
            ->assertSee('https://360.galipatsistem.com', false);
    }

    private function createTexturedFrame(int $shiftX): string
    {
        $im = imagecreatetruecolor(420, 320);
        $bg = imagecolorallocate($im, 210, 215, 220);
        imagefill($im, 0, 0, $bg);
        for ($i = 0; $i < 24; $i++) {
            $x = (($i * 47 - $shiftX) % 600 + 600) % 600;
            $y = ($i * 37) % 240 + 20;
            $col = imagecolorallocate($im, 40 + ($i * 19) % 180, 60 + ($i * 29) % 160, 80 + ($i * 13) % 150);
            imagefilledrectangle($im, $x, $y, $x + 42, $y + 42, $col);
        }
        ob_start();
        imagejpeg($im, null, 90);
        $bytes = (string) ob_get_clean();
        imagedestroy($im);

        return $bytes;
    }

    private function createPngBytes(int $w, int $h): string
    {
        $im = imagecreatetruecolor($w, $h);
        $bg = imagecolorallocate($im, 180, 140, 90);
        imagefill($im, 0, 0, $bg);
        ob_start();
        imagepng($im);
        $bytes = (string) ob_get_clean();
        imagedestroy($im);

        return $bytes;
    }
}
