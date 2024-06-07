<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {

    public function __construct() {
        $this->middleware('auth:api', ['except'=>['login']]);
    }

    public function login() {
        $credenciales = request(['email','password']);
        if(!$token = Auth::attempt($credenciales) ) {
            return response()->json(['message'=>'Unauthorized'], 401);
        }
        return $this->responderConToken($token);
    }

    protected function responderConToken($token) {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }

    public function me() {
        return response()->json( Auth::user() );
    }

    public function logout() {
        Auth::logout();
        return response()->json(['message'=>'Sesión cerrada con éxito']);
    }

    public function refresh() {
        return $this->responderConToken( Auth::refresh() );
    }


}
