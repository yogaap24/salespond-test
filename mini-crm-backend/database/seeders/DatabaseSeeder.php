<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\CallLog;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Contact::factory(25)->create();

        $contactIds = Contact::all()->pluck('id');

        CallLog::factory(50)->create([
            'contact_id' => $contactIds->random()
        ]);
    }
}
