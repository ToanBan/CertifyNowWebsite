<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;
use App\Models\ExamResults;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;

class CeritificateController extends Controller
{
    public function createcertificate($id){
        $certificate = ExamResults::with(['user', 'exam'])->where([
            'user_id' => Auth::id(),
            'exam_id' => $id,
        ])->first();
        $data = [
            'name' => $certificate->user->name,
            'score' => $certificate->score,
            'exam' => $certificate->exam->name_exam,
            'date' => $certificate->created_at->format('Y-m-d'),
        ];
        return view('certificate.template', compact('data'));
    }

    public function downloadCertificate($id)
    {
        $certificate = ExamResults::with(['user', 'exam'])->where([
            'user_id' => Auth::id(),
            'exam_id' => $id,
        ])->first();

        $data = [
            'name' => $certificate->user->name,
            'score' => $certificate->score,
            'exam' => $certificate->exam->name_exam,
            'date' => $certificate->created_at->format('Y-m-d'),
        ];

        $pdf = PDF::loadView('certificate.template', compact('data'))->setPaper('A4', 'landscape');;
        return $pdf->download('certificate.pdf');
    }

    
}
