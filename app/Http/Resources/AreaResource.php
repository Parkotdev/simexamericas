<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AreaResource extends JsonResource
{
    public static $wrap = "areas";

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
            'simulation' => $this->simulation,
            'groups' => new GroupCollection($this->groups),
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
