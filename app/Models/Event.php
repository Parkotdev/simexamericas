<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_es',
        'event_en',
        'event_fr',
        'event_pt'
    ];

    public function incidents()
    {
        return $this->hasMany(Incident::class);
    }
}
