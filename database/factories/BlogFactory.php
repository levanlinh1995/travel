<?php

use Faker\Generator as Faker;

$factory->define(App\Model\Blog::class, function (Faker $faker) {
    $title = $faker->sentence(6,true);
    return [
        'user_id' => function() {
            return App\Model\User::all()->random()->id;
        },
        'title' => $title,
        'slug' => str_slug($title),
        'content' => $faker->text,
        'status' => rand(0, 2),
    ];
});