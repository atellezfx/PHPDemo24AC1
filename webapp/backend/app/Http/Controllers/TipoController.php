<?php

namespace App\Http\Controllers;

use App\Http\Requests\TipoRequest;
use App\Models\Tipo;
use Illuminate\Http\Request;

class TipoController extends Controller {

    public function __construct() {
        $this->middleware('auth:api');
    }

    public function index() { // SELECT * FROM ...
        return Tipo::all();
    }

    public function show(Tipo $tipo) { // SELECT * FROM ... WHERE id=...
        return $tipo;
    }

    public function store(TipoRequest $request) { // INSERT INTO ... VALUES(...)
        $tipo = Tipo::create($request->validated());
        return $tipo; // Objeto del registro insertado en la tabla
    }

    public function update(TipoRequest $request, Tipo $tipo) { // UPDATE ... WHERE id=...
        $tipo->update( $request->validated() );
        return $tipo;
    }

    public function destroy(Tipo $tipo) { // DELETE ... WHERE id=...
        $tipo->delete();
        return response()->noContent();
    }

}
