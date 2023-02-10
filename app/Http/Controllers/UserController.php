<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \App\Http\Resources\UserCollection
     */
    public function index()
    {
        return new UserCollection(User::all());
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
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $data = [
            'name' => $request->name,
            'last_name' => $request->last_name,
            'country_id' => $request->country_id
        ];

        if ($request->phone) {
            $data['phone'] = $request->phone;
        }

        if ($request->organization) {
            $data['organization'] = $request->phone;
        }

        $user->update($data);

        return (new UserResource($user))->response()->setStatusCode(200);
    }

    /**
     * Update photo of the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePhoto(Request $request)
    {
        $user = User::find($request->id);

        if ($user->photo) {
            Storage::disk('public')->delete($user->photo);
            File::where('type_id', $request->id)->where('type', 'user')->where('path', $user->photo)->delete();
        }

        $file = $request->file('file');
        $name = $file->getClientOriginalName();
        $path = $file->store('user', 'public');

        File::create([
            'id' => Str::random(16),
            'type_id' => $request->id,
            'type' => 'user',
            'name' => $name,
            'path' => $path,
        ]);

        $user->update(['photo' => $path]);

        return (new UserResource($user))->response()->setStatusCode(200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
