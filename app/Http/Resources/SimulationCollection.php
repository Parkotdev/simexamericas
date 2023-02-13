<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SimulationCollection extends ResourceCollection
{
    public static $wrap = "simulations";

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection;
    }

    public function withResponse($request, $response)
    {
        $response->header('Accept', 'application/json');
    }
}
