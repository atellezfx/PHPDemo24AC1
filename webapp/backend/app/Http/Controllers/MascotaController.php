<?php

namespace App\Http\Controllers;

use App\Http\Requests\MascotaRequest;
use App\Models\Mascota;
use Illuminate\Http\Request;

class MascotaController extends Controller {

    public function __construct() {
        $this->middleware('auth:api');
    }

    public function index() { // SELECT * FROM ...
        return Mascota::all();
    }

    public function show(Mascota $mascota) { // SELECT * FROM ... WHERE id=...
        return $mascota;
    }

    public function store(MascotaRequest $request) { // INSERT INTO ... VALUES(...)
        $mascota = Mascota::create($request->validated());
        return $mascota; // Objeto del registro insertado en la tabla
    }

    public function update(MascotaRequest $request, Mascota $mascota) { // UPDATE ... WHERE id=...
        $mascota->update( $request->validated() );
        return $mascota;
    }

    public function destroy(Mascota $mascota) { // DELETE ... WHERE id=...
        $mascota->delete();
        return response()->noContent();
    }

    public function catalogo(int $propietario) {
        return Mascota::query()->where( 'propietario', $propietario )->get();
    }

}
