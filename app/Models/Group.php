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

    /**
     * Get the subgroups associated with the group.
     */
    public function subgroups()
    {
        return $this->hasMany(Subgroup::class);
    }

    /**
     * Get the users associated with the group.
     */
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
