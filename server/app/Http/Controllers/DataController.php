<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Data;
use App\User;

class DataController extends Controller
{   
    //**********************  FUNCTION  **********************\\


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
		//$datas = Data::orderBy('updated_at','desc')->paginate(20);
        //$idNeedName = array();
        //foreach($datas as $data){
        //    array_push($idNeedName, $data->userId);
        //}
        //$users = User::whereIn('id', $idNeedName)->get();
        $datas = DB::table('data')
            ->orderBy('updated_at','desc')
            ->leftjoin('users', 'data.userId', '=', 'users.id')
            ->select('data.*', 'users.name')
            ->paginate(20);
        return $datas;
	}

    public function userData($id){
        //$datas = Data::where('userId',$id)->orderBy('updated_at','desc')->paginate(20);
        $datas = DB::table('data')
            ->where('userId',$id)
            ->orderBy('updated_at','desc')
            ->leftjoin('users', 'data.userId', '=', 'users.id')
            ->select('data.*', 'users.name')
            ->paginate(20);
        return $datas;      
    }

    public function dataStore(Request $request){
    	$data = new Data;
    	$data->data = $request->data;
    	$data->userId = $request->userId;
    	$result = $data->save();
    	return ["result" => $result];
    }

    public function edit(request $request){
        if($request->rejected==1) return ["result" => 0, "error" => "Unable to verify user"];
        $data = Data::where('id', $request->id)->first();
        if( $data->userId != $request->userId ) return ["result" => 0, "error" => "Unable to verify user"];
        Data::where('id', $request->id)->update([
            'data' => $request->data
        ]);
        return ["result" => 1];
    }
}
