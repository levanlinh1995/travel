<?php

namespace App\Http\Controllers\V1\Comment;

use App\Http\Controllers\V1\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Model\Comment;
use App\Model\Post;
use App\Transformers\CommentTransformer;

class CommentController extends Controller
{
    public function addPostComment($id, Request $request)
    {
        $this->validate($request, [
            'content' => 'required',
        ]);

        $post = Post::find($id);

        $comment = $post->comments()->create([
            'user_id' => Auth::id(),
            'content' => $request->content
        ]);

        $data = $this->item($comment, new CommentTransformer());
        $responeData = array_merge([
            'success' => true,
            'message' => 'ok',
        ], $data);

        return response()->json($responeData, Response::HTTP_OK);
    }

    public function deletePostComment($id)
    {
        $post = Post::find($id);
        $post->comments()->where([
            'user_id' => Auth::id()
        ])->delete();
    }
}
