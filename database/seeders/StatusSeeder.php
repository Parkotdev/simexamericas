<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $status = new Status();
        $status->id = Str::random(16);
        $status->status_es = 'Creación';
        $status->status_en = 'Creation';
        $status->status_fr = 'Création';
        $status->status_pt = 'Criação';
        $status->save();

        $status = new Status();
        $status->id = Str::random(16);
        $status->status_es = 'Configuración';
        $status->status_en = 'Configuration';
        $status->status_fr = 'Paramètre';
        $status->status_pt = 'Contexto';
        $status->save();

        $status = new Status();
        $status->id = Str::random(16);
        $status->status_es = 'Registro';
        $status->status_en = 'Registration';
        $status->status_fr = 'Registre';
        $status->status_pt = 'Registro';
        $status->save();

        $status = new Status();
        $status->id = Str::random(16);
        $status->status_es = 'Activa';
        $status->status_en = 'Active';
        $status->status_fr = 'Actif';
        $status->status_pt = 'Ativo';
        $status->save();

        $status = new Status();
        $status->id = Str::random(16);
        $status->status_es = 'Finalizada';
        $status->status_en = 'Completed';
        $status->status_fr = 'Terminé';
        $status->status_pt = 'Finalizado';
        $status->save();
    }
}
