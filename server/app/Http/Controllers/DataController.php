<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data;
use App\User;

class DataController extends Controller
{   
    public function verifyUser($request, $idNeeded){
        $expiredTime = 604800;//One Week
        $check = User::where([
            ['id', $request->userId],
            ['remember_token', $request->token]
        ])->first();
        if($check==null){
            return 0;
        } elseif($request->userId!=$idNeeded){
            return 0;
        } elseif ( (time() - strtotime($check->updated_at))>$expiredTime ) {
            return 0;
        }
        //Remember last request
        User::where('id', $request->userId)->update([
            'remember_token' => $check->remember_token
        ]);
        //User Confirmed
        return 1;
    }

	public function index(){        
		$datas = Data::orderBy('updated_at','desc')->paginate(20);
        $n = count($datas);
        $users = User::all();
        for ($i=0;$i<$n;$i++) {
            $userName = $users[$datas[$i]->userId-1]->name;
            $datas[$i]->userName = $userName;
        }
        return $datas;
	}

    public function userData($id){
        $datas = Data::where('userId',$id)->orderBy('updated_at','desc')->paginate(20);
        $n = count($datas);
        $users = User::all();
        for ($i=0;$i<$n;$i++) {
            $userName = $users[$datas[$i]->userId-1]->name;
            $datas[$i]->userName = $userName;
        }
        return $datas;
    }

    public function dataStore(Request $request){
        if ($this->verifyUser($request, $request->userId)==0){
            return ["result" => 2, "error" => "Unable to verify user"];
        }
    	$data = new Data;
    	$data->data = $request->data;
    	$data->userId = $request->userId;
    	$result = $data->save();
    	return ["result" => $result];
    }

    public function edit(request $request){
        $data = Data::where('id', $request->id)->first();
        //return ["result" => $this->verifyUser($request, $data->userId), "ID needed" => $data->userId, ];
        if ($this->verifyUser($request, $data->userId)==0){
            return ["result" => 2, "error" => "Unable to verify user"];
        }
        Data::where('id', $request->id)->update([
            'data' => $request->data
        ]);
        return ["result" => 1];
    }

    public function clientIp(request $request){
        return ["clientIp" => $request->ip()];
    }
}
