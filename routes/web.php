<?php

use App\Http\Controllers\Admin\CrewController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\EventController as AdminEventController;
use App\Http\Controllers\Admin\FloorplanController as AdminFloorplanController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Kru\CaptureController as KruCaptureController;
use App\Http\Controllers\Kru\DashboardController as KruDashboardController;
use App\Http\Controllers\Kru\FloorplanController as KruFloorplanController;
use App\Http\Controllers\PublicTourController;
use Illuminate\Support\Facades\Route;

// Public Showcase & Direct Tour Access (No Login Required)
Route::get('/', HomeController::class)->name('home');
Route::get('/tour/{slug}', [PublicTourController::class, 'show'])->name('tour.show');
Route::get('/tour/{slug}/data', [PublicTourController::class, 'data'])->name('tour.data');

// Authentication
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.attempt');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Admin Utama Panel
Route::prefix('admin')->name('admin.')->middleware(['auth', 'role:admin'])->group(function (): void {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::get('/events/create', [AdminEventController::class, 'create'])->name('events.create');
    Route::post('/events', [AdminEventController::class, 'store'])->name('events.store');
    Route::get('/events/{event}/edit', [AdminEventController::class, 'edit'])->name('events.edit');
    Route::put('/events/{event}', [AdminEventController::class, 'update'])->name('events.update');
    Route::delete('/events/{event}', [AdminEventController::class, 'destroy'])->name('events.destroy');
    Route::get('/events/{event}/qr', [AdminEventController::class, 'downloadQr'])->name('events.qr');

    Route::get('/events/{event}/floorplan', [AdminFloorplanController::class, 'edit'])->name('floorplan.edit');
    Route::post('/events/{event}/floorplan/upload', [AdminFloorplanController::class, 'uploadFloorplan'])->name('floorplan.upload');
    Route::post('/events/{event}/floorplan/builder', [AdminFloorplanController::class, 'saveBuilderFloorplan'])->name('floorplan.builder');

    Route::post('/events/{event}/pins', [AdminFloorplanController::class, 'storePin'])->name('pins.store');
    Route::put('/pins/{pin}', [AdminFloorplanController::class, 'updatePin'])->name('pins.update');
    Route::delete('/pins/{pin}', [AdminFloorplanController::class, 'destroyPin'])->name('pins.destroy');

    Route::post('/pins/{pin}/photos', [AdminFloorplanController::class, 'storePhoto'])->name('pins.photos.store');
    Route::delete('/photos/{photo}', [AdminFloorplanController::class, 'destroyPhoto'])->name('photos.destroy');

    Route::post('/photos/{photo}/links', [AdminFloorplanController::class, 'storeNavigationLink'])->name('photos.links.store');
    Route::delete('/links/{link}', [AdminFloorplanController::class, 'destroyNavigationLink'])->name('links.destroy');

    Route::get('/crew', [CrewController::class, 'index'])->name('crew.index');
    Route::post('/crew', [CrewController::class, 'store'])->name('crew.store');
    Route::patch('/crew/{user}/toggle', [CrewController::class, 'toggle'])->name('crew.toggle');
    Route::put('/crew/{user}/assignments', [CrewController::class, 'syncAssignments'])->name('crew.assignments');
});

// Kru Lapangan Mobile-First Portal
Route::prefix('kru')->name('kru.')->middleware(['auth', 'role:kru,admin'])->group(function (): void {
    Route::get('/', [KruDashboardController::class, 'index'])->name('dashboard');
    Route::get('/events/{event}', [KruFloorplanController::class, 'show'])->name('events.show');
    Route::get('/pins/{pin}/capture', [KruCaptureController::class, 'show'])->name('pins.capture');
    Route::post('/pins/{pin}/stitch', [KruCaptureController::class, 'stitchFrames'])->name('pins.stitch');
    Route::post('/pins/{pin}/photos', [KruCaptureController::class, 'storePhoto'])->name('pins.photos.store');
    Route::delete('/photos/{photo}', [KruCaptureController::class, 'destroyPhoto'])->name('photos.destroy');
});

// Direct download route for built Android APK (when available)
Route::get('/download/ruang360-kru.apk', function () {
    $apkPath = storage_path('app/public/apk/ruang360-kru.apk');
    abort_unless(file_exists($apkPath), 404, 'File APK belum tersedia.');

    return response()->download($apkPath, 'Ruang360-Kru.apk', [
        'Content-Type' => 'application/vnd.android.package-archive',
    ]);
})->name('download.apk');
