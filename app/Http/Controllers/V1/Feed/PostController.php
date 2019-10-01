<?php

namespace App\Http\Controllers\V1\Feed;

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
        $posts = Post::latest()->with('user.profile')->paginate(15);

        $data = $this->paginate($posts, new PostTransformer());
        $responeData = array_merge([
            'success' => true,
            'message' => 'ok',
        ], $data);

        return response()->json($responeData, Response::HTTP_OK);
    }
}
