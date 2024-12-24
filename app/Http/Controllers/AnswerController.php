<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Answer;
use Illuminate\Support\Facades\DB;
class AnswerController extends Controller
{
    public function index(){
        $questions = DB::table("questions")->get();
        $answers = Answer::with("question")->get();
        return response()->json(['questions' => $questions,'answers'=> $answers]);
    }


    public function store(Request $request){
        $data = $request->all();
        if($data){
            Answer::updateOrCreate([
                'question_id' => $data['question_id'],
                'answer_text' => $data['answer_text'],
                'is_correct' => $data['is_correct'],
            ]);
            return response()->json(['message' => 'add successfully']);
        }
        return response()->json(['message' => 'add error']);
    }
}
