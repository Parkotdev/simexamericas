<?php

namespace App\Http\Controllers;

use App\Http\Resources\AreaCollection;
use App\Http\Resources\AreaResource;
use App\Models\Area;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \App\Http\Resources\AreaCollection
     */
    public function index()
    {
        return new AreaCollection(Area::all());
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

        $param = [
            'id' => Str::random(16),
            'simulation_id' => $data->id_parent,
            'name' => $data->name,
            'color' => $data->color
        ];

        if ($data->description) {
            $param['description'] = $data->description;
        }

        $area = Area::create($param);

        if ($data->icon) {
            $file = $request->file('file');
            $name = $file->getClientOriginalName();
            $path = $file->store('area', 'public');
            File::create([
                'id' => Str::random(16),
                'type_id' => $area->id,
                'type' => 'area',
                'name' => $name,
                'path' => $path,
            ]);
            $area->update(['icon' => $path]);
        }

        return (new AreaResource(Area::find($area->id)))->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Area  $area
     * @return \Illuminate\Http\Response
     */
    public function show(Area $area)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Area  $area
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Area $area)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  $id
     * @return bool
     */
    public function destroy($id)
    {
        Area::where('id', $id)->delete();
        return true;
    }
}
