<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'id',
        'area_id',
        'name',
        'description',
        'color',
        'icon'
    ];

    /**
     * Get the area associated with the group.
     */
    public function area()
    {
        return $this->belongsTo(Area::class);
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
