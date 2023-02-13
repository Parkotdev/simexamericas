<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'id',
        'event_es',
        'event_en',
        'event_fr',
        'event_pt'
    ];

    public function incidents()
    {
        return $this->hasMany(Incident::class);
    }

    public function id(): string
    {
        return (string) $this->id;
    }

    public function event_es(): string
    {
        return (string) $this->event_es;
    }

    public function event_en(): string
    {
        return (string) $this->event_en;
    }

    public function event_fr(): string
    {
        return (string) $this->event_fr;
    }

    public function event_pt(): string
    {
        return (string) $this->event_pt;
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
