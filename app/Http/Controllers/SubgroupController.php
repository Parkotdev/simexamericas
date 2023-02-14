<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubgroupCollection;
use App\Http\Resources\SubgroupResource;
use App\Models\File;
use App\Models\Subgroup;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SubgroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \App\Http\Resources\SubgroupCollection
     */
    public function index()
    {
        return new SubgroupCollection(Subgroup::all());
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
            'group_id' => $data->id_parent,
            'name' => $data->name,
            'color' => $data->color
        ];

        if ($data->description) {
            $param['description'] = $data->description;
        }

        $group = Subgroup::create($param);

        if ($data->icon) {
            $file = $request->file('file');
            $name = $file->getClientOriginalName();
            $path = $file->store('subgroup', 'public');
            File::create([
                'id' => Str::random(16),
                'type_id' => $group->id,
                'type' => 'subgroup',
                'name' => $name,
                'path' => $path,
            ]);
            $group->update(['icon' => $path]);
        }

        return (new SubgroupResource(Subgroup::find($group->id)))->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Subgroup  $subgroup
     * @return \Illuminate\Http\Response
     */
    public function show(Subgroup $subgroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Subgroup  $subgroup
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subgroup $subgroup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return bool
     */
    public function destroy($id)
    {
        Subgroup::where('id', $id)->delete();
        return true;
    }
}
