<?php 

namespace App\Transformers;

use App\Transformers\Transformer;
use App\Model\Like;

class LikeTransformer extends Transformer
{
    public $type = 'like';

    protected $defaultIncludes = [
        'user',
    ];

    public function transform($like)
    {
        return [
            'id' => $like->id,
            'createdAt' => $like->created_at->toDateTimeString(),
            'updatedAt' => $like->updated_at->toDateTimeString()
        ];
    }

    public function includeUser(Like $like)
    {
        $user = $like->user;

        return $this->item($user, new UserTransformer, 'user');
    }
}
