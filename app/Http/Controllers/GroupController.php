<?php

namespace App\Http\Controllers;

use App\Http\Resources\GroupCollection;
use App\Http\Resources\GroupResource;
use App\Models\File;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \App\Http\Resources\GroupCollection
     */
    public function index()
    {
        return new GroupCollection(Group::all());
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
            'area_id' => $data->id_parent,
            'name' => $data->name,
            'color' => $data->color
        ];

        if ($data->description) {
            $param['description'] = $data->description;
        }

        $group = Group::create($param);

        if ($data->icon) {
            $file = $request->file('file');
            $name = $file->getClientOriginalName();
            $path = $file->store('group', 'public');
            File::create([
                'id' => Str::random(16),
                'type_id' => $group->id,
                'type' => 'group',
                'name' => $name,
                'path' => $path,
            ]);
            $group->update(['icon' => $path]);
        }

        return (new GroupResource(Group::find($group->id)))->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function show(Group $group)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Group $group)
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
        Group::where('id', $id)->delete();
        return true;
    }
}
