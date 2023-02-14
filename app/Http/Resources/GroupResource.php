<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GroupResource extends JsonResource
{
    public static $wrap = "groups";

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id(),
            'area' => $this->area,
            'subgroups' => $this->subgroups,
            'users' => $this->users,
            'name' => $this->name(),
            'description' => $this->description(),
            'color' => $this->color(),
            'icon' => $this->icon(),
            'created_at' => $this->created_at(),
            'updated_at' => $this->updated_at()
        ];;
    }

    public function withResponse($request, $response)
    {
        $response->header('Accept', 'application/json');
    }
}
