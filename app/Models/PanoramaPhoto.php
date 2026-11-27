<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class PanoramaPhoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'pin_id',
        'phase',
        'angle_label',
        'image_path',
        'thumb_path',
        'initial_yaw',
        'file_size',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'initial_yaw' => 'float',
            'file_size' => 'integer',
        ];
    }

    public function pin(): BelongsTo
    {
        return $this->belongsTo(LocationPin::class, 'pin_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function navigationLinks(): HasMany
    {
        return $this->hasMany(NavigationLink::class, 'from_photo_id')->orderBy('id');
    }

    public function getImageUrlAttribute(): string
    {
        return Storage::disk('public')->url($this->image_path);
    }

    public function getThumbUrlAttribute(): string
    {
        return Storage::disk('public')->url($this->thumb_path);
    }
}
