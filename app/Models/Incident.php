<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'id',
        'event_id',
        'incident_es',
        'incident_en',
        'incident_fr',
        'incident_pt'
    ];

    /**
     * Get the event associated with the incident.
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function simulations()
    {
        return $this->hasMany(Simulation::class);
    }

    public function id(): string
    {
        return (string) $this->id;
    }

    public function incident_es(): string
    {
        return (string) $this->incident_es;
    }

    public function incident_en(): string
    {
        return (string) $this->incident_en;
    }

    public function incident_fr(): string
    {
        return (string) $this->incident_fr;
    }

    public function incident_pt(): string
    {
        return (string) $this->incident_pt;
    }

    public function created_at(): string
    {
        return (string) $this->created_at;
    }

    public function updated_at(): string
    {
        return (string) $this->updated_at;
    }
}
