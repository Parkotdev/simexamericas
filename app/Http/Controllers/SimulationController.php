<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventCollection;
use App\Http\Resources\IncidentCollection;
use App\Models\Country;
use App\Models\Event;
use App\Models\Incident;
use App\Models\Simulation;
use App\Models\Status;
use Illuminate\Http\Request;

class SimulationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Simulation  $simulation
     * @return \Illuminate\Http\Response
     */
    public function show(Simulation $simulation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Simulation  $simulation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Simulation $simulation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Simulation  $simulation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Simulation $simulation)
    {
        //
    }

    public function simulationData()
    {
        return [
            'statuses' => Status::all(),
            'events' => new EventCollection(Event::all()),
            'incidents' => new IncidentCollection(Incident::all()),
            'countries' => Country::all()
        ];
    }
}
