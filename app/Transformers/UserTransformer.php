<?php 

namespace App\Transformers;

use App\Transformers\Transformer;
use App\Model\User;

class UserTransformer extends Transformer
{
    public $type = 'user';

    protected $defaultIncludes = [
        'profile'
    ];

    public function transform($user)
    {
        return [
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
            'status' => $user->status,
            'createdAt' => $user->created_at->toDateTimeString(),
            'updatedAt' => $user->updated_at->toDateTimeString()
        ];
    }

    public function includeProfile(User $user)
    {
        $profile = $user->profile;

        return $this->item($profile, new ProfileTransformer, 'profile');
    }
}