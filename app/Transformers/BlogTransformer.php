<?php 

namespace App\Transformers;

use App\Transformers\Transformer;
use App\Model\Blog;

class BlogTransformer extends Transformer
{
    public $type = 'blog';

    protected $defaultIncludes = [
        'author'
    ];

    public function transform($blog)
    {
        return [
            'id' => $blog->id,
            'title' => $blog->title,
            'slug' => $blog->slug,
            'featuredImageUrl' => $blog->featured_image,
            'content' => $blog->content,
            'status' => $blog->status,
            'createdAt' => $blog->created_at->toDateTimeString(),
            'updatedAt' => $blog->updated_at->toDateTimeString()
        ];
    }

    public function includeAuthor(Blog $blog)
    {
        $author = $blog->user;

        return $this->item($author, new UserTransformer, 'user');
    }
}
