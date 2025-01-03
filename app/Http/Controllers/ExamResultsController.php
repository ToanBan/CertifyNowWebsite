<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\ExamResults;
class ExamResultsController extends Controller
{
    public function score($id){
        $countQuestionExam = DB::table('exams')
        ->join('questions', 'exams.id', '=', 'questions.exam_id')
        ->where('exams.id', '=', $id)
        ->count();

        $userId = Auth::id();

        $countIsCorrect = DB::table('answers')
        ->join('user_answers', 'answers.id', '=', 'user_answers.answer_id')  
        ->join('questions', 'answers.question_id', '=', 'questions.id')
        ->where('answers.is_correct', 1)
        ->where('user_answers.user_id', $userId)
        ->where('questions.exam_id', $id)
        ->count();

        $warning = DB::table('vio_lates')->where([
            'user_id' => $userId,
            'exam_id' => $id
        ])->select('count_violate')->first();

        $percentPoint = 10 / $countQuestionExam;
        $result = $countIsCorrect * $percentPoint;
        ExamResults::updateOrCreate([
            'user_id' => $userId, 
            'exam_id' => $id,
            'score' => $result,
        ]);
        return response()->json(['score' => $result, 'socaudung' => $countIsCorrect, 'socauhoi' => $countQuestionExam, 'warning' => $warning]);
    }

    public function index(){
        $results = DB::table('exam_results')->get();
        return response()->json($results);
    }
}
