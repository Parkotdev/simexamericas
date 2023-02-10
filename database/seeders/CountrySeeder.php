<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $country = new Country();
        $country->id = Str::random(16);
        $country->name = "Afghanistan";
        $country->iso_code = "AF";
        $country->iso_code_3 = "AFG";
        $country->phone_code = "+93";
        $country->timezone = "Asia/Kabul";
        $country->gmt = "UTC +04:30";
    }
}
