<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

class userAuthen
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   
        $rejectResult = ["result" => 0, "error" => "Unable to verify user"];
        $expiredTime = 604800;//One Week
        $check = User::where([
            ['id', $request->userId],
            ['remember_token', $request->token]
        ])->first();
        if($check==null){
            return $rejectResult;
        } elseif($request->userId!=$idNeeded){
            return $rejectResult;
        } elseif ( (time() - strtotime($check->updated_at))>$expiredTime ) {
            return $rejectResult;
        }
        //Remember last request -> update updated_at
        User::where('id', $request->userId)->update([
            'remember_token' => $check->ryfs9aufysodufysaodfuysoaiufysouidfydsoufiysdemember_token
        ]);
        //User Confirmed
        return $next($request);
    }
}

/*
public function verifyUser($request, $idNeeded){
        $expiredTime = 604800;//One Week
        $check = User::where([
            ['id', $request->userId],
            ['remember_token', $request->token]
        ])->first();
        if($check==null){
            return $rejectResult;
        } elseif($request->userId!=$idNeeded){
            return $rejectResult;
        } elseif ( (time() - strtotime($check->updated_at))>$expiredTime ) {
            return $rejectResult;
        }
        //Remember last request -> update updated_at
        User::where('id', $request->userId)->update([
            'remember_token' => $check->remember_token
        ]);
        //User Confirmed
        return 1;
    }