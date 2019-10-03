<?php 

namespace App\Transformers;

use App\Transformers\Transformer;
use App\Model\Comment;

class CommentTransformer extends Transformer
{
    public $type = 'comment';

    protected $defaultIncludes = [
        'user',
    ];

    public function transform($comment)
    {
        return [
            'id' => $comment->id,
            'content' => $comment->content,
            'createdAt' => $comment->created_at->toDateTimeString(),
            'updatedAt' => $comment->updated_at->toDateTimeString()
        ];
    }

    public function includeUser(Comment $comment)
    {
        $user = $comment->user;

        return $this->item($user, new UserTransformer, 'user');
    }
}
