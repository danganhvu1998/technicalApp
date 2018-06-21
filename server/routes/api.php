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

Route::post('/users/login','AuthenController@login');
Route::post('/users/register','AuthenController@register');
Route::post('/users/token','AuthenController@token');
Route::post('/users/change','AuthenController@change');

Route::post('/data', 'DataController@dataStore');
Route::get('/data/{id}', 'DataController@userData');
Route::get('/data', 'DataController@index');
Route::post('/data/edit', 'DataController@edit');