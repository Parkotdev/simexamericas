<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\ConnectorController;
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
    return Inertia::render('simulation/Index');
});

Route::get('/getDataSignUp', function () {
    return ['countries' => Country::all(), 'simulations' => Simulation::where('status_id', '1')->get()];
});

Route::get('/userAuth', function () {
    return Auth::check() ? new UserCollection([Auth::user()]) : null;
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/getToken', function () {
        return csrf_token();
    });

    // PAGES
    Route::get('/simulation', function () {
        return Inertia::render('simulation/Index');
    });
    Route::get('/simulation/AreaGroupSubgroup', function () {
        return Inertia::render('simulation/AreaGroupSubgroup');
    });
    Route::get('/simulation/TaskMessage', function () {
        return Inertia::render('simulation/TaskMessage');
    });
    Route::get('/board/Excon', function () {
        return Inertia::render('board/Excon');
    });
    Route::get('/board/Participant', function () {
        return Inertia::render('board/Participant');
    });

    // CONNECTOR
    Route::post('/connector', [ConnectorController::class, 'connector']);

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

    // STATUS
    Route::controller(StatusController::class)->group(function () {
        Route::get('/statuses', 'index');
    });

    // SIMULATION
    Route::controller(SimulationController::class)->group(function () {
        Route::get('/simulationData', 'simulationData');
        Route::get('/simulationByStatus/{status_id}', 'simulationByStatus');
        Route::post('/simulation', 'store');
    });

    // AREA
    Route::controller(AreaController::class)->group(function () {
        Route::get('/areas', 'index');
    });
});

require __DIR__ . '/auth.php';
