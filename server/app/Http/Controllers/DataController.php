<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data;
use App\User;

class DataController extends Controller
{   
    //**********************  FUNCTION  **********************\\
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
        //Remember last request -> update updated_at
        User::where('id', $request->userId)->update([
            'remember_token' => $check->remember_token
        ]);
        //User Confirmed
        return 1;
    }

    public function nameTag($datas, $users){
        $nameSaver = array();
        foreach($users as $user){
            $nameSaver[$user->id] = $user->name;
        }
        $n = count($datas);
        for ($i=0;$i<$n;$i++) {
            $datas[$i]->userName = $nameSaver[$datas[$i]->userId];
            //$userName = $nameSaver[$datas[$i]->userId];
            //$datas[$i]->userName = $userName;
        }
        return $datas;
    }


    //**********************  ROUTE  **********************\\
	public function index(){        
		$datas = Data::orderBy('updated_at','desc')->paginate(20);
        $idNeedName = array();
        foreach($datas as $data){
            array_push($idNeedName, $data->userId);
        }
        $users = User::whereIn('id', $idNeedName)->get();
        return $this->nameTag($datas, $users);
	}

    public function userData($id){
        $datas = Data::where('userId',$id)->orderBy('updated_at','desc')->paginate(20);
        $idNeedName = array();
        foreach($datas as $data){
            array_push($idNeedName, $data->userId);
        }
        $users = User::whereIn('id', $idNeedName)->get();
        return $this->nameTag($datas, $users);        
    }

    public function dataStore(Request $request){
        if ($this->verifyUser($request, $request->userId)==0){
            return ["result" => 0, "error" => "Unable to verify user"];
        }
    	$data = new Data;
    	$data->data = $request->data;
    	$data->userId = $request->userId;
    	$result = $data->save();
    	return ["result" => $result];
    }

    public function edit(request $request){
        $data = Data::where('id', $request->id)->first();
        if ($this->verifyUser($request, $data->userId)==0){
            return ["result" => 0, "error" => "Unable to verify user"];
        }
        Data::where('id', $request->id)->update([
            'data' => $request->data
        ]);
        return ["result" => 1];
    }
}
