<?php

namespace Database\Factories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CallLog>
 */
class CallLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'contact_id' => Contact::factory(),
            'timestamp' => fake()->dateTimeThisMonth(),
            'duration' => fake()->numberBetween(15, 300),
            'status' => fake()->randomElement(['Completed', 'Missed', 'Voicemail']),
        ];
    }
}
