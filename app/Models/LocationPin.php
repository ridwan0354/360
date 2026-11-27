<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LocationPin extends Model
{
    use HasFactory;

    protected $fillable = [
        'floorplan_id',
        'pin_number',
        'title',
        'description',
        'dimensions_note',
        'pos_x',
        'pos_y',
    ];

    protected function casts(): array
    {
        return [
            'pin_number' => 'integer',
            'pos_x' => 'float',
            'pos_y' => 'float',
        ];
    }

    public function floorplan(): BelongsTo
    {
        return $this->belongsTo(Floorplan::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(PanoramaPhoto::class, 'pin_id')->orderBy('id');
    }

    public function sebelumPhotos(): HasMany
    {
        return $this->hasMany(PanoramaPhoto::class, 'pin_id')
            ->where('phase', 'sebelum')
            ->orderBy('id');
    }

    public function sesudahPhotos(): HasMany
    {
        return $this->hasMany(PanoramaPhoto::class, 'pin_id')
            ->where('phase', 'sesudah')
            ->orderBy('id');
    }

    public function incomingLinks(): HasMany
    {
        return $this->hasMany(NavigationLink::class, 'to_pin_id');
    }
}
