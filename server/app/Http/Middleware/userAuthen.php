<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use App\Data;

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
        $request->rejected = 0;
        $expiredTime = 604800;//One Week
        $check = User::where([
            ['id', $request->userId],
            ['remember_token', $request->token]
        ])->first();
        if($check==null){
            $request->rejected = 1;
            return $next($request);
        } elseif ( (time() - strtotime($check->updated_at))>$expiredTime ) {
            $request->rejected = 1;
            return $next($request);
        }
        //Remember last request -> update updated_at
        User::where('id', $request->userId)->update([
            'remember_token' => $check->remember_token
        ]);
        //User Confirmed
        return $next($request);
    }
}