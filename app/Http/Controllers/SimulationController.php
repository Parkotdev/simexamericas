<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventCollection;
use App\Http\Resources\IncidentCollection;
use App\Http\Resources\SimulationCollection;
use App\Http\Resources\SimulationResource;
use App\Models\Audit;
use App\Models\Country;
use App\Models\Event;
use App\Models\File;
use App\Models\Incident;
use App\Models\Simulation;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = json_decode($request->data);

        $simulation = Simulation::create([
            'id' => Str::random(16),
            'country_id' => $data->country_id,
            'incident_id' => $data->incident_id,
            'status_id' => $data->status_id,
            'name' => $data->name,
            'description' => $data->description,
            'date_start_real' => $data->date_start_real,
            'date_end_real' => $data->date_end_real,
            'date_start_sim' => $data->date_start_sim,
            'date_end_sim' => $data->date_end_sim,
            'pause' => false
        ]);

        Audit::create([
            'id' => Str::random(16),
            'user_id' => auth()->user()->id,
            'name' => 'add',
            'type_id' => $simulation->id,
            'type' => 'simulation',
            'nota' => "Agregar simulación: $simulation->name"
        ]);

        foreach ($data->incidents as $incident) {
            $simulation->incidents()->attach(Incident::find($incident->id), ['id' => Str::random(16)]);
        }

        if ($data->logo) {
            $file = $request->file('file-logo');
            $name = $file->getClientOriginalName();
            $path = $file->store('simulation', 'public');
            File::create([
                'id' => Str::random(16),
                'type_id' => $simulation->id,
                'type' => 'simulation',
                'name' => $name,
                'path' => $path,
            ]);
            $simulation->update(['logo' => $path]);
        }

        if ($data->icon) {
            $file = $request->file('file-icon');
            $name = $file->getClientOriginalName();
            $path = $file->store('simulation', 'public');
            File::create([
                'id' => Str::random(16),
                'type_id' => $simulation->id,
                'type' => 'simulation',
                'name' => $name,
                'path' => $path,
            ]);
            $simulation->update(['icon' => $path]);
        }

        return (new SimulationResource(Simulation::find($simulation->id)))->response()->setStatusCode(201);
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

    public function simulationByStatus($status_id)
    {
        return new SimulationCollection(Simulation::where('status_id', $status_id)->get());
    }
}
