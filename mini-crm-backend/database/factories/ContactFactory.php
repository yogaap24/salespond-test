<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'phone' => fake()->phoneNumber(),
            'company' => fake()->company(),
            'role' => fake()->randomElement(['Manager', 'Developer', 'Designer', 'QA Engineer']),
            'is_favorite' => fake()->boolean(20),
        ];
    }
}
