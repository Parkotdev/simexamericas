<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = new Role();
        $role->id = Str::random(16);
        $role->name_es = 'super-administrador';
        $role->name_en = 'super-administrator';
        $role->name_fr = 'super-administrateur';
        $role->name_pt = 'super-administrador';
        $role->save();

        $role = new Role();
        $role->id = Str::random(16);
        $role->name_es = 'administrador';
        $role->name_en = 'administrator';
        $role->name_fr = 'administrateur';
        $role->name_pt = 'administrador';
        $role->save();

        $role = new Role();
        $role->id = Str::random(16);
        $role->name_es = 'excon-general';
        $role->name_en = 'excon-general';
        $role->name_fr = 'excon-général';
        $role->name_pt = 'excon-geral';
        $role->save();

        $role = new Role();
        $role->id = Str::random(16);
        $role->name_es = 'excon-grupo';
        $role->name_en = 'excon-group';
        $role->name_fr = 'excon-groupe';
        $role->name_pt = 'excon-grupo';
        $role->save();

        $role = new Role();
        $role->id = Str::random(16);
        $role->name_es = 'participante';
        $role->name_en = 'participant';
        $role->name_fr = 'participant';
        $role->name_pt = 'participante';
        $role->save();

        $role = new Role();
        $role->id = Str::random(16);
        $role->name_es = 'observador-general';
        $role->name_en = 'observer-general';
        $role->name_fr = 'observateur-général';
        $role->name_pt = 'observador-geral';
        $role->save();

        $role = new Role();
        $role->id = Str::random(16);
        $role->name_es = 'observador-grupo';
        $role->name_en = 'observer-group';
        $role->name_fr = 'observateur-groupe';
        $role->name_pt = 'observador-grupo';
        $role->save();

        $role = new Role();
        $role->id = Str::random(16);
        $role->name_es = 'observador-participante';
        $role->name_en = 'observer-participant';
        $role->name_fr = 'observateur-participant';
        $role->name_pt = 'observador-participante';
        $role->save();
    }
}
