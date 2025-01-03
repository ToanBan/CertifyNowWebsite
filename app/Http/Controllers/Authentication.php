<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpMail;
use App\Models\Profile;
use Illuminate\Support\Facades\Storage;
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
        $otpExpiration = now()->addMinutes(1); 
        session(['otp' => $otp, 'otp_expiration' => $otpExpiration]);
        Mail::to($user->email)->send(new OtpMail($otp, $otpExpiration));
        $token = $user->createToken('auth_token')->plainTextToken;   
        return response()->json([
            'message' => 'Login successful. Please check your email for OTP.',
            'token' => $token,
            'otp_expiration' => $otpExpiration,
            'successfully' => true,
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
        $roleUser = auth()->user()->role;
        $numberOTP = $request->input('numberotp');
        $otpN = (int)$numberOTP;
        $otpS = session()->get('otp');
        $otp_ex = session()->get('otp_expiration');
        if($otpN == $otpS && $otp_ex > now()) {
            session(['verify' => true]);
            session()->forget('otp');  
            return response()->json(['message' => true, 'role' => $roleUser]);
        }
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => false]);
    }

    public function loginfaceid(Request $request){
        $user = Auth::user();
    }

    public function registerfaceid(Request $request)
    {
        $image = $request->input('imageSrc');
        if (!$image) {
            return response()->json(['message' => 'No image data provided'], 400);
        }
        $image = str_replace('data:image/webp;base64,', '', $image);
        $image = str_replace(' ', '+', $image); 
        $imageData = base64_decode($image);
        if ($imageData === false) {
            return response()->json(['message' => 'Invalid image data'], 400);
        }
        $imageName = 'faceid_' . time() . '.webp';
        $path = 'faceid/' . $imageName;

        $user = Auth::user();
        $user->face_id_image = $imageName;
        $user->save();
        if (Storage::disk('public')->put($path, $imageData)) {
            return response()->json([
                'message' => 'Image uploaded successfully',
                'path' => Storage::url($path)
            ]);
        } else {
            return response()->json(['message' => 'Failed to save image'], 500);
        }
    }

    public function verifyfaceid(Request $request){
        $image = $request->input('imgSrc');
        if (!$image) {
            return response()->json(['message' => 'No image data provided'], 400);
        }
        $image = str_replace('data:image/webp;base64,', '', $image);
        $image = str_replace(' ', '+', $image); 
        $imageData = base64_decode($image);
        if ($imageData === false) {
            return response()->json(['message' => 'Invalid image data'], 400);
        }
        $imageName = 'faceidverify_' . time() . '.webp';
        $path = 'faceidverify/' . $imageName;
        if (Storage::disk('public')->put($path, $imageData)) {
            return response()->json([
                'message' => 'Image uploaded successfully',
                'path' => Storage::url($path),
                'image' => $imageName
            ]);
        } else {
            return response()->json(['message' => 'Failed to save image'], 500);
        }
    }

}
