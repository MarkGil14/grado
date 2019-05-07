<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    'user' => 'API\UserController'
]);

Route::get('profile', 'API\UserController@profile');
Route::put('profile', 'API\UserController@updateProfile');

Route::get('findUser', 'API\UserController@search');

// Route::group(['prefix' => 'auth'], function($router){

//     Route::post('login', 'AuthController@login');
//     Route::post('logout', 'AuthController@logout');
//     Route::post('refresh', 'AuthController@refresh');
//     Route::post('me', 'AuthController@me');

// });




// Route::group(['middleware' => 'jwt.auth'], function($router){

//     Route::get('customers', 'CustomersController@all');
//     Route::get('customers/{id}', 'CustomersController@get');
//     Route::post('customers/new', 'CustomersController@new');

// });
