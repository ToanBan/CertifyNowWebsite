<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\OrderExam;
class OrderExamController extends Controller
{
    public function ordered(){
        $userId = Auth::id();
        $ordered = OrderExam::where("user_id", $userId)->select('exam_id')->get(); 
        return response($ordered);
    }
}
