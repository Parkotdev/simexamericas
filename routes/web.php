<?php

use App\Http\Controllers\CountryController;
use App\Http\Controllers\SimulationController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserCollection;
use App\Models\Country;
use App\Models\Simulation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Index');
});

Route::get('/getDataSignUp', function () {
    return ['countries' => Country::all(), 'simulations' => Simulation::where('status_id', '1')->get()];
});

Route::get('/userAuth', function () {
    return Auth::check() ? new UserCollection([Auth::user()]) : null;
});

Route::middleware('auth:sanctum')->group(function () {
    // COUNTRY
    Route::controller(CountryController::class)->group(function () {
        Route::get('/countries', 'index');
    });

    // USER
    Route::controller(UserController::class)->group(function () {
        Route::get('/users', 'index');
        Route::put('/users/{id}', 'update');
        Route::post('/userPhoto', 'updatePhoto');
    });

    // SIMULATION
    Route::controller(SimulationController::class)->group(function () {
        Route::get('/simulationData', 'simulationData');
    });

    // STATUS
    Route::controller(StatusController::class)->group(function () {
        Route::get('/statuses', 'index');
    });
});

require __DIR__ . '/auth.php';
