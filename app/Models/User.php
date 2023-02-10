<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'role_id',
        'country_id',
        'simulation_id',
        'area_id',
        'group_id',
        'subgroup_id',
        'name',
        'last_name',
        'email',
        'password',
        'status',
        'photo',
        'phone',
        'organization'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the role associated with the user.
     */
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }

    /**
     * Get the role associated with the user.
     */
    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    /**
     * Get the simulation associated with the user.
     */
    public function simulation()
    {
        return $this->belongsTo(Simulation::class);
    }

    /**
     * Get the area associated with the user.
     */
    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    /**
     * Get the group associated with the user.
     */
    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    /**
     * Get the subgroup associated with the user.
     */
    public function subgroup()
    {
        return $this->belongsTo(Subgroup::class);
    }

    public function id(): string
    {
        return (string) $this->id;
    }

    public function name(): string
    {
        return (string) $this->name;
    }

    public function last_name(): string
    {
        return (string) $this->last_name;
    }

    public function email(): string
    {
        return (string) $this->email;
    }

    public function status(): bool
    {
        return (bool) $this->status;
    }

    public function photo(): string
    {
        return (string) $this->photo;
    }

    public function phone(): string
    {
        return (string) $this->phone;
    }

    public function organization(): string
    {
        return (string) $this->organization;
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
