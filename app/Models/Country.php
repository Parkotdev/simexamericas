<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'iso_code',
        'iso_code_3',
        'phone_code',
        'timezone',
        'gmt'
    ];

    public function simulations()
    {
        return $this->hasMany(User::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
