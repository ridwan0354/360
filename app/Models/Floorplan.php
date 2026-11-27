<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Floorplan extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'source_type',
        'image_path',
        'canvas_json',
        'width',
        'height',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function pins(): HasMany
    {
        return $this->hasMany(LocationPin::class)->orderBy('pin_number');
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path ? Storage::disk('public')->url($this->image_path) : null;
    }
}
