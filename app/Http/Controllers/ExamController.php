<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Exam;
use Illuminate\Support\Facades\Storage;

class ExamController extends Controller
{
    public function index(){
        $exams = DB::table("exams")->latest()->get();
        return response()->json($exams);
    }

    public function store(Request $request){
        $data = $request->all();
        $haveImage = $request->file('image');
        $haveImagePath = null;
        if($haveImage){
            $haveImagePath = time() . '-' . $haveImage->getClientOriginalName();
            $haveImage->move(storage_path('app/public/image_exam'), $haveImagePath);
        }
        Exam::updateOrCreate([
            'name_exam' => $data['name_exam'],
            'description_exam' => $data['des_exam'],
            'duration' => $data['duration_exam'],
            'price' => $data['price'],
            'image' => $haveImagePath,
        ]);
        return response()->json(['message' => 'store successfully']);
        
    }

    public function destroy($id){
        $examToDelete = Exam::find($id);
        if($examToDelete){
            $examToDelete->delete();
        }
        return response()->json(['message' => 'Delete successfully']);
    }

    public function update($id, Request $request){
        $examToUpdate = Exam::find($id);
        $data = $request->all();
        $saveImage = $examToUpdate->image;
        $haveImage = $request->file('image');
        $haveImagePath = null;
        if($haveImage){
            $saveImagePath = storage_path('app/public/image_exam/'. $saveImage);
            if($saveImagePath){
                unlink($saveImagePath);
            }

            $haveImagePath = time() .'-'. $haveImage->getClientOriginalName();
            $haveImage->move(storage_path('app/public/image_exam'), $haveImagePath);
        }
        $examToUpdate->update([
            'name_exam' => $data['name_exam'],
            'description_exam' => $data['des_exam'],
            'duration' => $data['duration_exam'],
            'price' => $data['price'],
            'image' => $haveImagePath,
        ]);
        return response()->json(['message' => $saveImage]);
    }

    
}
