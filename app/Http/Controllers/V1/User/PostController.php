<?php

namespace App\Http\Controllers\V1\User;

use App\Http\Controllers\V1\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Transformers\PostTransformer;
use Illuminate\Http\Response;
use App\Model\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Auth::user()->posts()->latest()->with('user.profile')->paginate(15);

        $data = $this->paginate($posts, new PostTransformer());
        $responeData = array_merge([
            'success' => true,
            'message' => 'ok',
        ], $data);

        return response()->json($responeData, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'content' => 'required',
        ]);

        $post = new Post();
        $post->user_id = Auth::id();
        $post->status = Post::ENABLE_STATUS;
        $post->content = $request->content;
        $post->save();

        $data = $this->item($post, new PostTransformer());
        $responeData = array_merge([
            'success' => true,
            'message' => 'created post successfully.',
        ], $data);

        return response()->json($responeData, Response::HTTP_CREATED);
    }
}
