<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Model\User::class, 300)->create()->each(function ($user) {
            $user->profile()->save(factory(App\Model\Profile::class)->make());
        });
    }
}
