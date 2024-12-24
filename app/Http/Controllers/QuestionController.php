<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Question;
use App\Models\Exam;
class QuestionController extends Controller
{
    public function index(){
        $exams = DB::table("exams")->get();
        $questions = Question::with('exam')->get();
        return response()->json(['exams' => $exams, 'questions' => $questions]);
    }

    public function store(Request $request){
        $data = $request->all();
        Question::updateOrCreate([
            'exam_id' => $data['exam_id'],
            'questiton_text' => $data['question_text'],
        ]);
        return response()->json(['message' => 'Add Successfully']);
    }

    public function destroy($id){
        $questionToDelete = Question::find($id);
        if($questionToDelete){
            $questionToDelete->delete();
        }
        return response()->json(['message'=> 'delete successfully']);
    }

    public function update($id){
        $questionToUpdate = Question::find($id);
        $data = request()->all(); 
        if($questionToUpdate){
            $questionToUpdate->update([
                'exam_id' => $data['exam_id'],
                'questiton_text' => $data['question_text'],
            ]);
        }   
        return response()->json(['message' => 'update successfully']);
    }

    public function show($id){
        $questions = Exam::with(['question', 'question.answer'])->where('id', $id)->get();
        return response()->json(['message' => $questions]);
    }
}
