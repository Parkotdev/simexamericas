<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Simulation extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'id',
        'country_id',
        'incident_id',
        'status_id',
        'name',
        'description',
        'logo',
        'icon',
        'date_start_real',
        'date_end_real',
        'date_start_sim',
        'date_end_sim',
        'pause'
    ];

    /**
     * Get the country associated with the simulation.
     */
    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    /**
     * Get the incident associated with the simulation.
     */
    public function incident()
    {
        return $this->belongsTo(Incident::class);
    }

    /**
     * Get the status associated with the simulation.
     */
    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function areas()
    {
        return $this->hasMany(Areas::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
