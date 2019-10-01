<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Http\Response;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => Response::HTTP_UNAUTHORIZED,
                    'type' => 'token',
                    'message' => 'token_black_list'
                ],
                
            ], Response::HTTP_UNAUTHORIZED);
        } else if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => Response::HTTP_UNAUTHORIZED,
                    'type' => 'token',
                    'message' => 'token_expired'
                ],
            ], Response::HTTP_UNAUTHORIZED);
        } else if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => Response::HTTP_UNAUTHORIZED,
                    'type' => 'token',
                    'message' => 'token_invalid'
                ],
            ], Response::HTTP_UNAUTHORIZED);
        } else if ($exception instanceof \Tymon\JWTAuth\Exceptions\JWTException) { 
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => Response::HTTP_UNAUTHORIZED,
                    'type' => 'token',
                    'message' => 'token_occur'
                ],
            ], Response::HTTP_UNAUTHORIZED);
        }

        return parent::render($request, $exception);
    }
}
