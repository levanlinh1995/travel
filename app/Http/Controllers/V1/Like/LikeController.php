<?php

namespace App\Http\Controllers\V1\Like;

use App\Http\Controllers\V1\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Model\Like;
use App\Model\Post;
use App\Transformers\LikeTransformer;

class LikeController extends Controller
{
    public function likePost($id)
    {
        $post = Post::find($id);

        // check user has already liked
        $liked = $post->likes()->where([
            'user_id' => Auth::id()
        ])->first();

        if ($liked) {
            $responeData = [
                'success' => false,
                'error' => [
                    'code' => Response::HTTP_BAD_REQUEST,
                    'message' => 'something was wrong'
                ]
            ];
    
            return response()->json($responeData, Response::HTTP_BAD_REQUEST);
        }

        $like = $post->likes()->create([
            'user_id' => Auth::id()
        ]);

        $data = $this->item($like, new LikeTransformer());
        $responeData = array_merge([
            'success' => true,
            'message' => 'ok',
        ], $data);

        return response()->json($responeData, Response::HTTP_OK);
    }

    public function unlikePost($id)
    {
        $post = Post::find($id);
        $post->likes()->where([
            'user_id' => Auth::id()
        ])->delete();
    }
}
