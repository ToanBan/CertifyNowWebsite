<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\OrderExam;
use Illuminate\Support\Facades\DB;
class OrderExamController extends Controller
{
    public function ordered(){
        $userId = Auth::id();
        $ordered = OrderExam::where("user_id", $userId)->select('exam_id')->get(); 
        return response($ordered);
    }

    public function calculatedMonth(){
        $monthlySales = DB::table('order_exams')
        ->selectRaw('MONTH(created_at) as month, SUM(price) as total_price')
        ->groupBy('month')
        ->get();
        return response()->json($monthlySales);
    }
}
