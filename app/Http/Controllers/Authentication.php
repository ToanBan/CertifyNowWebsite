<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpMail;
use App\Models\Profile;
class Authentication extends Controller
{

    public function register(Request $request){
        $data = $request->all();
        $user = User::create([
            'name' => $data['username'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);


        if($user){
            Profile::create([
                'user_id' => $user->id,
                'name' => $data['username'],
            ]);
        }
        return response()->json(['message' => 'register successful']);
    }

    public function login(Request $request) {
        $data = $request->only(['email', 'password']);
        if (!Auth::attempt($data)) {
            return response()->json(['message' => 'Login error']);
        }     
        $user = Auth::user();
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $otpExpiration = now()->addMinutes(5); 
        session(['otp' => $otp, 'otp_expiration' => $otpExpiration]);
        Mail::to($user->email)->send(new OtpMail($otp));
        $token = $user->createToken('auth_token')->plainTextToken;   
        return response()->json([
            'message' => 'Login successful. Please check your email for OTP.',
            'token' => $token,
            'otp_expiration' => $otpExpiration,
        ]);
    }
    
    public function getUser(){
        $user = Auth::user();
        return response()->json(['user' => $user, 'authenticated' => true]);
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'logout successful']);
    }

    public function verify(Request $request){
        $userId = auth()->user()->id;
        $numberOTP = $request->input('numberotp');
        $otpN = (int)$numberOTP;
        $otpS = session()->get('otp');
        if($otpN == $otpS) {
            session(['verify' => true]);
            session()->forget('otp');
            
            return response()->json(['message' => true]);
        }
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => false]);
    }

    public function loginfaceid(Request $request){
        $user = Auth::user();
    }
}
