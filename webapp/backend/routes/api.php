<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MascotaController;
use App\Http\Controllers\PropietarioController;
use App\Http\Controllers\TipoController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware'=>'api'], function($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::get('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
} );

Route::group(['middleware' => 'api', 'prefix' => 'v1'], function(){
    // Siempre colocar la ruta en plural (para que Laravel encuentre el parámetro en singular en el controlador)
    Route::apiResource('tipos', TipoController::class);
    Route::apiResource('propietarios', PropietarioController::class);
    Route::apiResource('mascotas', MascotaController::class);
    Route::get('mascotas/catalogo/{propietario}', [MascotaController::class, 'catalogo']);
});

Route::get('login', function() {
    return app()->abort(401);
})->name('login');
