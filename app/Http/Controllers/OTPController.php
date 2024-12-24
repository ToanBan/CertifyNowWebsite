<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Mail\OtpMail; 
use Illuminate\Support\Facades\Mail;
use App\Models\User;
class OTPController extends Controller
{
    public function sendOTP(Request $request){
        $otp = Str::random(6); 
        Mail::to($request->email)->send(new OtpMail($otp));
        $user = User::where('email', $request->email)->first();
        $user->otp = $otp;
        $user->otp_expiration = now()->addMinutes(5); 
        $user->save();
        return response()->json(['message' => 'OTP sent to your email']);

    }
}
