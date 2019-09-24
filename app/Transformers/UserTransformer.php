<?php 

namespace App\Transformers;

use App\Transformers\Transformer;

class UserTransformer extends Transformer
{
    public $type = 'user';

    public function transform($user)
    {
        return [
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
            'created_at' => $user->created_at->toDateTimeString()
        ];
    }
}