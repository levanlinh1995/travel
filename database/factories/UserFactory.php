<?php

use Faker\Generator as Faker;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;


$factory->define(App\Model\User::class, function (Faker $faker) {
    return [
        'username' => $faker->userName,
        'email' => $faker->unique()->safeEmail,
        'password' => Hash::make('123456'),  // pass: 123456
        'email_verified_at' => date('Y-m-d H:i:s'),
        'remember_token' => Str::random(20),
    ];
});