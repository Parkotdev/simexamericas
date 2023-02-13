<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public static $wrap = "events";

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
            'incidents' => $this->incidents,
            'event_es' => $this->event_es(),
            'event_en' => $this->event_en(),
            'event_fr' => $this->event_fr(),
            'event_pt' => $this->event_pt(),
            'created_at' => $this->created_at(),
            'updated_at' => $this->updated_at()
        ];
    }

    public function withResponse($request, $response)
    {
        $response->header('Accept', 'application/json');
    }
}
