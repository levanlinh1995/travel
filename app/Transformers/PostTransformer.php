<?php 

namespace App\Transformers;

use App\Transformers\Transformer;
use App\Model\Post;

class PostTransformer extends Transformer
{
    public $type = 'post';

    protected $defaultIncludes = [
        'author',
        'likes',
        'comments'
    ];

    public function transform($post)
    {
        return [
            'id' => $post->id,
            'status' => $post->status,
            'content' => $post->content,
            'createdAt' => $post->created_at->toDateTimeString(),
            'updatedAt' => $post->updated_at->toDateTimeString()
        ];
    }

    public function includeAuthor(Post $post)
    {
        $author = $post->user;

        return $this->item($author, new UserTransformer, 'user');
    }

    public function includeLikes(Post $post)
    {
        $likes = $post->likes()->with('user')->get();

        return $this->collection($likes, new LikeTransformer, 'like');
    }

    public function includeComments(Post $post)
    {
        $comments = $post->comments()->with('user')->get();

        return $this->collection($comments, new CommentTransformer, 'comment');
    }
}
