<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Membuat fungsi regsiter dengan request dari end-point
    public function register(Request $request)
    {
        // Membuat validator untuk memvalidasi requst dari end-point
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);
        
        // Mengecheck jika terjadi kesalahan / kegagalan saat validasi
        if ($validator->fails()) {
            // Mengembalikan respon error dari validasi
            return response()->json($validator->errors());
        }
        
        // Membuat user baru
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        
        // Membuat auth token user
        $token = $user->createToken('auth_token')->plainTextToken;
        
        // Membuat response dari user dengan access token bertipe bearer
        return response()->json([
            'data' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    // Membuat fungsi login dengan request dari end-point
    public function login(Request $request)
    {
        // Mengecheck autentikasi apakah user sudah terauthorize atau belum
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        // Mengecheck email user dan membatalkan jika tidak ada
        $user = User::where('email', $request->email)->firstOrFail();
        
        // Membuat auth token user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Membuat response dengan pesan login dan access token bertipe bearer
        return response()->json([
            'message' => 'Login success',
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    // Membuat fungsi logout
    public function logout()
    {
        // Menghapus token dari user
        Auth::user()->tokens()->delete();
        // Membuat response dengan pesan logout
        return response()->json([
            'message' => 'logout success'
        ]);
    }
}
