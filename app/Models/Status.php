<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $fillable = [
        'status_es',
        'status_en',
        'status_fr',
        'status_pt'
    ];

    public function simulations()
    {
        return $this->hasMany(Simulation::class);
    }
}
