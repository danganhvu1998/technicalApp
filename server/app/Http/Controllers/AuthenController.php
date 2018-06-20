<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AuthenController extends Controller
{
    public function login(request $request){
    	$check = User::where([
    	 	['email', $request->email],
    	 	['password', hash('ripemd160',$request->password)]
    	 ])->first();
		if($check==null){
			return ["result" => 0, "error" => "Wrong Email or Password"];
		}
		//$regis->remember_token = hash('ripemd160',$request->password.strval(rand(0,2000000000)));
		$check->token = hash('ripemd160',$request->password.strval(rand(0,2000000000)));
		User::where('id', $check->id)->update([
                'remember_token' => $check->token
        ]);
		$check->result = 1;
		return $check;
    }

	public function register(request $request){
		$check = User::where('email', $request->email)->first();
		if($check!=null){
			return ["result" => 0, "error" => "Account Existed"];
		}
		$regis = new User;
    	$regis->name = $request->email;
    	$regis->email = $request->email;
    	$regis->password = hash('ripemd160',$request->password);
    	$result = $regis->save();
    	return ["result" => 1];
    }    
}
