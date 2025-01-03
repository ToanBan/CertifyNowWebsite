<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserAnswers;
use Illuminate\Support\Facades\Auth;
use App\Models\VioLate;
class UserAnswersController extends Controller
{
    public function receive(Request $request) {
        $userId = Auth::id();
        $userAnswers = $request->input('useranswers'); 
        $exam_id = $request->input('id_exam');
        $countWarning = $request->input('warning');
        foreach ($userAnswers as $answer) {
            UserAnswers::updateOrCreate([
                'user_id' => $userId,
                'question_id' => $answer['question_id'], 
                'answer_id' => $answer['answer_id'], 
            ]);
        }

        VioLate::updateOrCreate([
            'user_id' => $userId, 
            'exam_id' => $exam_id, 
            'count_violate'=> $countWarning,
        ]);
        return response()->json(['message' => $countWarning]);
    }
    
}
