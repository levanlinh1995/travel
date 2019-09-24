<?php

namespace App\Http\Controllers\V1\User;

use App\Http\Controllers\V1\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Transformers\PostTransformer;

class PostController extends Controller
{
    public function getPostList()
    {
        $posts = Auth::user()->posts;
        return $this->collection($posts, new PostTransformer());
    }
}
