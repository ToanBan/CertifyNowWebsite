<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserAnswers;
use Illuminate\Support\Facades\Auth;
class UserAnswersController extends Controller
{
    public function receive(Request $request){
        $answer_id = $request->input('useranswers');
        $question_id = $request->input('question_id');
        $userId = Auth::id();  
        foreach($answer_id as $item){
            UserAnswers::updateOrCreate([
                'user_id' => $userId,
                'question_id' => $question_id,
                'answer_id' => $item,
            ]);
        }
        return response()->json(['message' => $answer_id]);
    }
}
