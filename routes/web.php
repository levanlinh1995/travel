<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

Route::group([
    'prefix' => 'api/v1',
    'namespace' => 'V1'
], function ($router) {
    /******** AUTHENTICATION *****************************************************/
    Route::group([
        'prefix' => 'auth',
        'namespace' => 'Auth'
    ], function ($router) {
        Route::post('login', 'AuthController@login');
        Route::post('signup', 'AuthController@signup');
        Route::post('check-email-exists', 'AuthController@checkEmailExists');
        Route::post('check-username-exists', 'AuthController@checkUsernameExists');

        Route::group([
            'middleware' => ['auth']
        ], function ($router) {
            Route::post('logout', 'AuthController@logout');
            Route::post('refresh', 'AuthController@refresh');
            Route::post('me', 'AuthController@me');
        });
    });

    /******** USER *****************************************************/
    Route::group([
        'prefix' => 'user',
        'namespace' => 'User',
        'middleware' => ['auth']
    ], function ($router) {
        Route::get('posts', 'PostController@index');
        Route::post('posts', 'PostController@store');
    });

    /******** FEED *****************************************************/
    Route::group([
        'prefix' => 'feed',
        'namespace' => 'Feed',
        'middleware' => ['auth']
    ], function ($router) {
        Route::get('posts', 'PostController@index');
    });

    /******** BLOG (STORY) *****************************************************/
    Route::group([
        'prefix' => 'blog',
        'namespace' => 'Blog',
    ], function ($router) {
        Route::get('list', 'BlogController@index');
    });

    /******** LIKE *****************************************************/
    Route::group([
        'namespace' => 'Like',
        'middleware' => ['auth']
    ], function ($router) {
        Route::post('post/{id}/like', 'LikeController@likePost');
        Route::post('post/{id}/unlike', 'LikeController@unlikePost');
    });
});
