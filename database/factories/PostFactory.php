<?php

use Faker\Generator as Faker;


$factory->define(App\Model\Post::class, function (Faker $faker) {
    return [
        'user_id' => function() {
            return App\Model\User::all()->random()->id;
        },
        'content' => $faker->text,
        'status' => rand(0, 2),
    ];
});