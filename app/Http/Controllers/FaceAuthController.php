<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;    
class FaceAuthController extends Controller
{
    public function faceLogin(Request $request){
        $image = $request->input('image_faceid');
        $image = str_replace('data:image/png;base64', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageData = base64_decode($image);
        $imageName = 'face_' . time() . '.png';
        $imagePath = storage_path('app/public/temp_image/' . $imageName);
        if(!file_exists(storage_path('app/public/temp_image'))){
            mkdir(storage_path('app/public/temp_image'), 0777, true);
        }
        file_put_contents($imagePath, $imageData);
        $users = User::whereNotNull('face_id_image')->get();
        if ($users->isEmpty()) {
            return response()->json(['message' => 'No users with FaceID found'], 404);
        }

        
        return response()->json(['message' =>  $users]);
    }
}
