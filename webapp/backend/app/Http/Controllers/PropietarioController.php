<?php

namespace App\Http\Controllers;

use App\Http\Requests\PropietarioRequest;
use App\Models\Propietario;
use Illuminate\Http\Request;

class PropietarioController extends Controller {

    public function __construct() {
        $this->middleware('auth:api');
    }

    public function index() { // SELECT * FROM ...
        return Propietario::all();
    }

    public function show(Propietario $propietario) { // SELECT * FROM ... WHERE id=...
        return $propietario;
    }

    public function store(PropietarioRequest $request) { // INSERT INTO ... VALUES(...)
        $propietario = Propietario::create($request->validated());
        return $propietario; // Objeto del registro insertado en la tabla
    }

    public function update(PropietarioRequest $request, Propietario $propietario) { // UPDATE ... WHERE id=...
        $propietario->update( $request->validated() );
        return $propietario;
    }

    public function destroy(Propietario $propietario) { // DELETE ... WHERE id=...
        $propietario->delete();
        return response()->noContent();
    }

}
