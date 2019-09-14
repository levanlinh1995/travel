<?php

use Faker\Generator as Faker;

$factory->define(App\Model\Profile::class, function (Faker $faker) {
    $title = $faker->sentence(6,true);
    return [
        'user_id' => function() {
            return App\Model\User::all()->random()->id;
        },
        'first_name' => $faker->word,
        'last_name' => $faker->word,
        'date_of_birth' => $faker->dateTimeBetween('-30 years', 'now', null),
        'gender' => rand(0, 2),
        'phone' => $faker->tollFreePhoneNumber,
        'avatar_url' => '',
        'description' => $faker->sentence(15, true)
    ];
});