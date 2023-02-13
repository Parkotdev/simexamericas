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
     * Get the incidents associated with the simulation.
     */
    public function incidents()
    {
        return $this->belongsToMany(Incident::class);
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

    public function id(): string
    {
        return (string) $this->id;
    }

    public function name(): string
    {
        return (string) $this->name;
    }

    public function description(): string
    {
        return (string) $this->description;
    }

    public function logo(): string
    {
        return (string) $this->logo;
    }

    public function icon(): string
    {
        return (string) $this->icon;
    }

    public function date_start_real(): string
    {
        return (string) $this->date_start_real;
    }

    public function date_end_real(): string
    {
        return (string) $this->date_end_real;
    }

    public function date_start_sim(): string
    {
        return (string) $this->date_start_sim;
    }

    public function date_end_sim(): string
    {
        return (string) $this->date_end_sim;
    }

    public function pause(): bool
    {
        return (bool) $this->pause;
    }
}
