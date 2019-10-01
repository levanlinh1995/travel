<?php

namespace App\Http\Controllers\V1\Blog;

use App\Http\Controllers\V1\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Transformers\BlogTransformer;
use Illuminate\Http\Response;
use App\Model\Blog;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::latest()->with('user.profile')->paginate(15);

        $data = $this->paginate($blogs, new BlogTransformer());
        $responeData = array_merge([
            'success' => true,
            'message' => 'ok',
        ], $data);

        return response()->json($responeData, Response::HTTP_OK);
    }
}
