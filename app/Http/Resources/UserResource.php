<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = "users";

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
            'role' => $this->role,
            'country' => $this->country,
            'simulation' => $this->simulation,
            'area' => $this->area,
            'group' => $this->group,
            'subgroup' => $this->subgroup,
            'name' => $this->name(),
            'last_name' => $this->last_name(),
            'email' => $this->email(),
            'status' => $this->status()
        ];
    }
}
