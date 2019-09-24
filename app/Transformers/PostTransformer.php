<?php 

namespace App\Transformers;

use App\Transformers\Transformer;

class PostTransformer extends Transformer
{
    public $type = 'post';

    public function transform($post)
    {
        return [
            'id' => $post->id,
            'content' => $post->content,
        ];
    }
}
