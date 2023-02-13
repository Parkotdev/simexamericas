<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $event = new Event();
        $event->id = Str::random(16);
        $event->event_es = "Antrópico";
        $event->event_en = "Antrópico";
        $event->event_fr = "Antrópico";
        $event->event_pt = "Antrópico";
        $event->save();

        $event = new Event();
        $event->id = Str::random(16);
        $event->event_es = "Biológico";
        $event->event_en = "Biológico";
        $event->event_fr = "Biológico";
        $event->event_pt = "Biológico";
        $event->save();

        $event = new Event();
        $event->id = Str::random(16);
        $event->event_es = "Ecológico";
        $event->event_en = "Ecológico";
        $event->event_fr = "Ecológico";
        $event->event_pt = "Ecológico";
        $event->save();

        $event = new Event();
        $event->id = Str::random(16);
        $event->event_es = "Geológico";
        $event->event_en = "Geológico";
        $event->event_fr = "Geológico";
        $event->event_pt = "Geológico";
        $event->save();

        $event = new Event();
        $event->id = Str::random(16);
        $event->event_es = "Hidrometeorológico";
        $event->event_en = "Hidrometeorológico";
        $event->event_fr = "Hidrometeorológico";
        $event->event_pt = "Hidrometeorológico";
        $event->save();

        $event = new Event();
        $event->id = Str::random(16);
        $event->event_es = "Materiales peligrosos";
        $event->event_en = "Materiales peligrosos";
        $event->event_fr = "Materiales peligrosos";
        $event->event_pt = "Materiales peligrosos";
        $event->save();

        $event = new Event();
        $event->id = Str::random(16);
        $event->event_es = "Radiológico";
        $event->event_en = "Radiológico";
        $event->event_fr = "Radiológico";
        $event->event_pt = "Radiológico";
        $event->save();

        $event = new Event();
        $event->id = Str::random(16);
        $event->event_es = "Social";
        $event->event_en = "Social";
        $event->event_fr = "Social";
        $event->event_pt = "Social";
        $event->save();
    }
}
