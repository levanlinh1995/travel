<?php 

namespace App\Transformers;

use App\Transformers\Transformer;

class ProfileTransformer extends Transformer
{
    public $type = 'profile';

    public function transform($profile)
    {
        return [
            'id' => $profile->id,
            'fullName' => $profile->full_name,
            'firstName' => $profile->first_name,
            'lastName' => $profile->last_name,
            'dateOfBirth' => $profile->date_of_birth ? $profile->date_of_birth->toDateTimeString() : '',
            'gender' => $profile->gender,
            'phone' => $profile->phone,
            'avatarUrl' => $profile->avatar_url,
            'description' => $profile->description,
            'createdAt' => $profile->created_at->toDateTimeString(),
            'updatedAt' => $profile->updated_at->toDateTimeString()
        ];
    }
}