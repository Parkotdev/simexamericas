<?php

namespace Database\Seeders;

use App\Models\Rating;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rating = new Rating();
        $rating->id = Str::random(16);
        $rating->name_es = 'Pendiente';
        $rating->name_en = 'Pending';
        $rating->name_fr = 'En attente';
        $rating->name_pt = 'Pendente';
        $rating->save();

        $rating = new Rating();
        $rating->id = Str::random(16);
        $rating->name_es = 'Inconclusa';
        $rating->name_en = 'Unfinished';
        $rating->name_fr = 'Inachevé';
        $rating->name_pt = 'Inacabado';
        $rating->save();

        $rating = new Rating();
        $rating->id = Str::random(16);
        $rating->name_es = 'Finalizada';
        $rating->name_en = 'Completed';
        $rating->name_fr = 'Complété';
        $rating->name_pt = 'Concluído';
        $rating->save();
    }
}
