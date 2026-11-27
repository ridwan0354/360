<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NavigationLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'from_photo_id',
        'to_pin_id',
        'yaw',
        'pitch',
        'label',
    ];

    protected function casts(): array
    {
        return [
            'yaw' => 'float',
            'pitch' => 'float',
        ];
    }

    public function fromPhoto(): BelongsTo
    {
        return $this->belongsTo(PanoramaPhoto::class, 'from_photo_id');
    }

    public function toPin(): BelongsTo
    {
        return $this->belongsTo(LocationPin::class, 'to_pin_id');
    }
}
