<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $fillable = [
        'simulation_id',
        'name',
        'description',
        'color',
        'icon'
    ];

    /**
     * Get the simulation associated with the area.
     */
    public function simulation()
    {
        return $this->belongsTo(Simulation::class);
    }

    public function groups()
    {
        return $this->hasMany(Group::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
