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
        return $this->hasMany(User::class);
    }
}
