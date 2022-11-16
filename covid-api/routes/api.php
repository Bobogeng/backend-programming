<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RecordDetailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Membuat end-point register dengan http request post
Route::post('/register', [AuthController::class, 'register']);
// Membuat end-point login dengan http request post
Route::post('/login', [AuthController::class, 'login']);

// Membuat group end-point dengan middleware sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Membuat end-point logout dengan http request post serta AuthController sebagai controller dan mengambil fungsi logout
    Route::post('/logout', [AuthController::class, 'logout']);
    // Membuat end-point patients dengan http request get serta RecordDetailController sebagai controller dan mengambil fungsi index
    Route::get('/patients', [RecordDetailController::class, 'index']);
    // Membuat end-point patients dengan http request post serta RecordDetailController sebagai controller dan mengambil fungsi store
    Route::post('/patients', [RecordDetailController::class, 'store']);
    // Membuat end-point patients berparamater id dengan http request get serta RecordDetailController sebagai controller dan mengambil fungsi show
    Route::get('/patients/{id}', [RecordDetailController::class, 'show']);
    // Membuat end-point patients berparamater id dengan http request put serta RecordDetailController sebagai controller dan mengambil fungsi update
    Route::put('/patients/{id}', [RecordDetailController::class, 'update']);
    // Membuat end-point patients berparamater id dengan http request delete serta RecordDetailController sebagai controller dan mengambil fungsi destroy
    Route::delete('/patients/{id}', [RecordDetailController::class, 'destroy']);
    // Membuat end-point patients/search berparamater name dengan http request get serta RecordDetailController sebagai controller dan mengambil fungsi search
    Route::get('/patients/search/{name}', [RecordDetailController::class, 'search']);
    // Membuat end-point patients/search/positive berparamater name dengan http request get serta RecordDetailController sebagai controller dan mengambil fungsi positive
    Route::get('/patients/status/positive', [RecordDetailController::class, 'positive']);
    // Membuat end-point patients/search/recovered berparamater name dengan http request get serta RecordDetailController sebagai controller dan mengambil fungsi recovered
    Route::get('/patients/status/recovered', [RecordDetailController::class, 'recovered']);
    // Membuat end-point patients/search/dead berparamater name dengan http request get serta RecordDetailController sebagai controller dan mengambil fungsi dead
    Route::get('/patients/status/dead', [RecordDetailController::class, 'dead']);
});
