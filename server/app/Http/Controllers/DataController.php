<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data;
use App\User;

class DataController extends Controller
{
	public function index(){
		$datas = Data::orderBy('updated_at','desc')->paginate(20);
        $n = count($datas);
        $users = User::all();
        for ($i=0;$i<$n;$i++) {
            $userName = User::where('id', $datas[$i]->userId)->first()->name;
            $datas[$i]->userName = $userName;
        }
        return $datas;
	}

    public function userData($id){
        $datas = Data::where('userId',$id)->orderBy('updated_at','desc')->paginate(20);
        $n = count($datas);
        $users = User::all();
        for ($i=0;$i<$n;$i++) {
            $userName = User::where('id', $datas[$i]->userId)->first()->name;
            $datas[$i]->userName = $userName;
        }
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
        Data::where('id', $request->id)->update([
            'data' => $request->data
        ]);
        return ["result" => 1];
    }

}
