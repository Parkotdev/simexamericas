<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IncidentResource extends JsonResource
{
    public static $wrap = "incidents";

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
            'event' => $this->event,
            'incident_es' => $this->incident_es(),
            'incident_en' => $this->incident_en(),
            'incident_fr' => $this->incident_fr(),
            'incident_pt' => $this->incident_pt(),
            'created_at' => $this->created_at(),
            'updated_at' => $this->updated_at()
        ];
    }

    public function withResponse($request, $response)
    {
        $response->header('Accept', 'application/json');
    }
}
