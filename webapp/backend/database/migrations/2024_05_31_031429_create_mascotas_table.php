<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('mascotas', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('nombre')->nullable(false);
            $table->foreignId('propietario')->nullable(false)->constrained('propietarios')->cascadeOnDelete()->cascadeOnUpdate();
            $table->date('fechaNac')->nullable(false);
            $table->string('raza')->nullable(false);
            $table->string('color')->nullable(false);
            $table->enum('genero', ['macho','hembra'])->nullable(false);
            $table->foreignId('tipo')->nullable(false)->constrained('tipos')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('fotoUrl', 255)->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('mascotas');
    }
};
