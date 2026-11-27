<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Event extends Model
{
    use HasFactory;

    public const STATUSES = [
        'draf' => 'Draf',
        'persiapan' => 'Persiapan',
        'berlangsung' => 'Berlangsung',
        'selesai' => 'Selesai',
    ];

    protected $fillable = [
        'title',
        'event_date',
        'venue_name',
        'organizer_name',
        'description',
        'logo_path',
        'public_slug',
        'bg_music_path',
        'status',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Event $event): void {
            if (empty($event->public_slug)) {
                $event->public_slug = static::generateUniqueSlug($event->title);
            }
        });
    }

    public static function generateUniqueSlug(string $title): string
    {
        $base = Str::slug(Str::limit($title, 36, ''));
        $base = $base ?: 'event';

        do {
            $slug = $base.'-'.Str::lower(Str::random(6));
        } while (static::where('public_slug', $slug)->exists());

        return $slug;
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(EventAssignment::class);
    }

    public function crew(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'event_assignments')
            ->withTimestamps();
    }

    public function floorplan(): HasOne
    {
        return $this->hasOne(Floorplan::class)->latestOfMany();
    }

    public function pins(): HasManyThrough
    {
        return $this->hasManyThrough(LocationPin::class, Floorplan::class)
            ->orderBy('location_pins.pin_number');
    }

    public function getLogoUrlAttribute(): ?string
    {
        return $this->logo_path ? Storage::disk('public')->url($this->logo_path) : null;
    }

    public function getBgMusicUrlAttribute(): ?string
    {
        return $this->bg_music_path ? Storage::disk('public')->url($this->bg_music_path) : null;
    }

    public function getPublicUrlAttribute(): string
    {
        return route('tour.show', $this->public_slug);
    }

    /**
     * Compute pin & photo completion stats across both phases.
     *
     * @return array{total_pins:int,filled_pins:int,sebelum_pins:int,sesudah_pins:int,total_photos:int,progress_percent:int}
     */
    public function getCompletionStatsAttribute(): array
    {
        $pins = $this->floorplan ? $this->floorplan->pins()->with('photos')->get() : collect();
        $totalPins = $pins->count();

        if ($totalPins === 0) {
            return [
                'total_pins' => 0,
                'filled_pins' => 0,
                'sebelum_pins' => 0,
                'sesudah_pins' => 0,
                'total_photos' => 0,
                'progress_percent' => 0,
            ];
        }

        $filledPins = 0;
        $sebelumPins = 0;
        $sesudahPins = 0;
        $totalPhotos = 0;

        foreach ($pins as $pin) {
            $photos = $pin->photos;
            $totalPhotos += $photos->count();
            $hasSebelum = $photos->contains('phase', 'sebelum');
            $hasSesudah = $photos->contains('phase', 'sesudah');

            if ($hasSebelum) {
                $sebelumPins++;
            }
            if ($hasSesudah) {
                $sesudahPins++;
            }
            if ($hasSebelum || $hasSesudah) {
                $filledPins++;
            }
        }

        return [
            'total_pins' => $totalPins,
            'filled_pins' => $filledPins,
            'sebelum_pins' => $sebelumPins,
            'sesudah_pins' => $sesudahPins,
            'total_photos' => $totalPhotos,
            'progress_percent' => (int) round(($filledPins / $totalPins) * 100),
        ];
    }
}
