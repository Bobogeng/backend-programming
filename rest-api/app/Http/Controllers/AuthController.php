<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    // membuat fitur register
    public function register(Request $request)
    {
        // membuat validasi 
        $validatedData = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:users|email',
            'password' => 'required|min:8'
        ]);

        if ($validatedData->fails()) {
            return response()->json($validatedData->errors());
        }

        // memanggil model user untuk insert data
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // membuat pesan jika user berhasil dibuat
        $data = [
            'message' => 'User is created successfully'
        ];

        // mengembalikan data (json) dan kode 200
        return response()->json($data, 200);
    }

    // membuat fitur login
    public function login(Request $request)
    {

        // melakukan autentikasi
        if (Auth::attempt($request->only('email', 'password'))) {

            // membuat token
            $token = Auth::user()->createToken('auth_token');

            // membuat message jika berhasil
            $data = [
                'message' => 'Login successfully',
                'token' => $token->plainTextToken
            ];

            // mengembalikan response json dengan kode 200
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => 'Username or password is wrong'
            ];

            // mengembalikan response json dengan kode 401
            return response()->json($data, 401);
        }
    }
}