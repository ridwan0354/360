<?php

use App\Http\Controllers\Api\KruApiController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [KruApiController::class, 'login'])->name('api.login');

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('/me', [KruApiController::class, 'me'])->name('api.me');
    Route::post('/logout', [KruApiController::class, 'logout'])->name('api.logout');

    Route::get('/events', [KruApiController::class, 'events'])->name('api.events.index');
    Route::get('/events/{event}', [KruApiController::class, 'showEvent'])->name('api.events.show');

    Route::post('/pins/{pin}/stitch', [KruApiController::class, 'stitchPinFrames'])->name('api.pins.stitch');
    Route::post('/pins/{pin}/photos', [KruApiController::class, 'storePinPhoto'])->name('api.pins.photos.store');
    Route::delete('/photos/{photo}', [KruApiController::class, 'destroyPhoto'])->name('api.photos.destroy');
});
