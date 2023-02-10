<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subgroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_id',
        'name',
        'description',
        'color',
        'icon'
    ];

    /**
     * Get the group associated with the subgroup.
     */
    public function subgroup()
    {
        return $this->belongsTo(Subgroup::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
