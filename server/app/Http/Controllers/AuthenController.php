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

    public function token(request $request){
        $expiredTime = 604800;//One Week
    	$check = User::where('remember_token', $request->token)->first();
		if($check==null){
			return ["result" => 0, "error" => "Token not found"];
		}
        if((time() - strtotime($check->updated_at))>$expiredTime){
            return ["result" => 0, "error" => "Token not found"];   
        }
		$check->token = hash('ripemd160',$request->token.strval(rand(0,2000000000)));
		User::where('id', $check->id)->update([
                'remember_token' => $check->token
        ]);
		$check->result = 1;
		return $check;
    }

    public function change(request $request){
    	//Take out the user
    	$check = User::where([
    	 	['id', $request->id],
    	 	['password', hash('ripemd160',$request->password)]
    	 ])->first();
		if($check==null){
			return ["result" => 0, "error" => "Wrong Password"];
		}
		//Change user info
		User::where('id', $request->id)->update([
            //'remember_token' => hash('ripemd160',$request->userPass.strval(rand(0,2000000000))),
            'name' => $request->userName,
            'password' => hash('ripemd160',$request->userPass)
        ]);
        return ["result" => 1];
    }
}
