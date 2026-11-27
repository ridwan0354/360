<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('event_date')->nullable();
            $table->string('venue_name');
            $table->string('organizer_name')->nullable();
            $table->text('description')->nullable();
            $table->string('logo_path')->nullable();
            $table->string('public_slug')->unique();
            $table->string('bg_music_path')->nullable();
            $table->string('status', 30)->default('persiapan');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('event_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['event_id', 'user_id']);
        });

        Schema::create('floorplans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete();
            $table->string('source_type', 20)->default('upload'); // upload | builder
            $table->string('image_path')->nullable();
            $table->longText('canvas_json')->nullable();
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('height')->nullable();
            $table->timestamps();
        });

        Schema::create('location_pins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('floorplan_id')->constrained('floorplans')->cascadeOnDelete();
            $table->unsignedInteger('pin_number');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('dimensions_note')->nullable();
            $table->decimal('pos_x', 6, 2);
            $table->decimal('pos_y', 6, 2);
            $table->timestamps();
        });

        Schema::create('panorama_photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pin_id')->constrained('location_pins')->cascadeOnDelete();
            $table->string('phase', 20); // sebelum | sesudah
            $table->string('angle_label')->nullable();
            $table->string('image_path');
            $table->string('thumb_path');
            $table->decimal('initial_yaw', 7, 2)->default(0);
            $table->unsignedBigInteger('file_size')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('navigation_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('from_photo_id')->constrained('panorama_photos')->cascadeOnDelete();
            $table->foreignId('to_pin_id')->constrained('location_pins')->cascadeOnDelete();
            $table->decimal('yaw', 7, 2)->default(0);
            $table->decimal('pitch', 7, 2)->default(-8);
            $table->string('label')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('navigation_links');
        Schema::dropIfExists('panorama_photos');
        Schema::dropIfExists('location_pins');
        Schema::dropIfExists('floorplans');
        Schema::dropIfExists('event_assignments');
        Schema::dropIfExists('events');
    }
};
