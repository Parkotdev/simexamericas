<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $user = new User();
    $user->id = Str::random(16);
    $user->role_id = "aIugBRMRxkKYyk0i";
    $user->country_id = "245";
    $user->name = "Rogney";
    $user->last_name = "Cañizares de la Cruz";
    $user->email = "rogneycdc@gmail.com";
    $user->email_verified_at = now();
    $user->password = bcrypt("12345");
    $user->status = true;
    $user->save();
  }
}
