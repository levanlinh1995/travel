<?php

namespace App\Http\Controllers\V1;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Model\User;
use App\Model\Profile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => [
            'login',
            'signup',
            'checkEmailExists',
            'checkUsernameExists',
        ]]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return response()->json([
                'error' => [
                    'code' => 401,
                    'type' => 'login',
                    'message' => 'email or password is incorrect.'
                ]
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    public function checkEmailExists(Request $request) {
        $user = User::where('email', $request->email)->first();

        return response()->json([
            'data' => [
                'email' => $user ? 'exist' : ''
            ]
        ]);
    }

    public function checkUsernameExists(Request $request) {
        $user = User::where('username', $request->username)->first();

        return response()->json([
            'data' => [
                'username' => $user ? 'exist' : ''
            ]
        ]);
    }

    public function signup(Request $request)
    {
        $this->validate($request, [
            'firstName' => 'required|max:50',
            'lastName' => 'required|max:50',
            'email' => 'required|email|unique:users,email',
            'username' => 'required|max:50|alpha_num|unique:users,username',
            'password' => 'required|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/',
            'repassword' => 'required|same:password'
        ], [
            'password.regex' => 'Password must be at least 8 characters and contain a lowercase character, uppercase character and a number.'
        ]);

        DB::transaction(function() use ($request){
            $user = new User();
            $user->email = $request->email;
            $user->username = $request->username;
            $user->password = Hash::make($request->password);
            $user->save();

            $profile = new Profile();
            $profile->user_id = $user->id;
            $profile->first_name = $request->firstName;
            $profile->last_name = $request->lastName;
            $profile->save();
        });

        return $this->login($request);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(Auth::user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }
}
