<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'id',
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

    public function color(): string
    {
        return (string) $this->color;
    }

    public function icon(): string
    {
        return (string) $this->icon;
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
