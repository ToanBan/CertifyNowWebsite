<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Authentication;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\UserAnswersController;
use App\Http\Controllers\OrderExamController;
Route::get('/', function(){
    return view('index');
})->middleware('ck_login');



Route::get('/auth/check', [Authentication::class,'getUser'])->name('getUser');

Route::post('/logout', [Authentication::class,'logout'])->name('logout');

Route::get('/{login}', function(){
    return view('index');
})->where('login', 'login');

Route::get('/welcome', function(){
    return view('email.welcome');
});


Route::get('/test', function(){
    return view('test');
});

Route::post('/login', [Authentication::class,'login'])->name('login');
Route::post('/login-faceid', [Authentication::class, 'loginfaceid']);


Route::post('/register', [Authentication::class,'register'])->name('register');

Route::post('/verify', [Authentication::class, 'verify'])->name('verify');

Route::get('/profile', [ProfileController::class, 'index']);
Route::post('/profile/setup-faceid', [ProfileController::class, 'setupfaceid']);
Route::put('/profile/{id}', [ProfileController::class, 'update']);

Route::get('/admin', function(){
    return view('admin');
});

Route::get('/exam', [ExamController::class,'index'])->name('success');;
Route::post('/exam', [ExamController::class,'store']);
Route::delete('/exam/{id}', [ExamController::class,'destroy']);
Route::put('/exam/{id}', [ExamController::class,'update']);

Route::get('/question', [QuestionController::class,'index']);
Route::post('/question', [QuestionController::class,'store']);
Route::delete('/question/{id}', [QuestionController::class,'destroy']);
Route::put('/question/{id}', [QuestionController::class,'update']);
Route::post('/question/{id}', [QuestionController::class,'show']);

Route::get('/answer', [AnswerController::class, 'index']);
Route::post('/answer', [AnswerController::class,'store']);
Route::delete('/answer/{id}', [AnswerController::class,'destroy']);
Route::put('/answer/{id}', [AnswerController::class,'update']);


Route::post('/useranswers', [UserAnswersController::class, 'receive']);

Route::get('/exam/{id}', function(){
    return view('index');
});



Route::post('/session', [StripeController::class, 'session']);
Route::get('/success', [StripeController::class, 'success']);
Route::get('/orderexam', [OrderExamController::class, 'ordered']);



Route::get('/{verify}', function(){
    return view('index');
})->where('verify', 'verify');

