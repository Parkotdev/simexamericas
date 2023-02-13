<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SimulationResource extends JsonResource
{
    public static $wrap = "simulations";

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
            'country' => $this->country,
            'incident' => $this->incident,
            'incidents' => $this->incidents,
            'status' => $this->status,
            'name' => $this->name(),
            'description' => $this->description(),
            'logo' => $this->logo(),
            'icon' => $this->icon(),
            'date_start_real' => $this->date_start_real(),
            'date_end_real' => $this->date_end_real(),
            'date_start_sim' => $this->date_start_sim(),
            'date_end_sim' => $this->date_end_sim(),
            'pause' => $this->pause(),
            'created_at' => $this->created_at(),
            'updated_at' => $this->updated_at()
        ];
    }

    public function withResponse($request, $response)
    {
        $response->header('Accept', 'application/json');
    }
}
