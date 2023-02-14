<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubgroupResource extends JsonResource
{
    public static $wrap = "subgroups";

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
            'group' => $this->group,
            'users' => new UserCollection($this->users),
            'name' => $this->name(),
            'description' => $this->description(),
            'color' => $this->color(),
            'icon' => $this->icon(),
            'created_at' => $this->created_at(),
            'updated_at' => $this->updated_at()
        ];
    }

    public function withResponse($request, $response)
    {
        $response->header('Accept', 'application/json');
    }
}
