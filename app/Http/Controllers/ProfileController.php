<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
class ProfileController extends Controller
{
    public function index(){
        $userId = auth()->user()->id;
        $profile = DB::table('profiles')->where('user_id', $userId)->get();
        return response()->json($profile);
    }

    public function update($id){
        $profileToUpdate = Profile::find($id);
        $haveImage = request()->file('image');
        $saveImage = $profileToUpdate->image;
        $data = request()->all();
        $haveImagePath = null;
        if($haveImage && !$saveImage){
            
            $haveImagePath = time() . '-' . $haveImage->getClientOriginalName();
            $haveImage->move(storage_path('app/public/profiles'), $haveImagePath);
        }elseif($haveImage && $saveImage){
            $saveImagePath = storage_path('app/public/profiles/' . $saveImage);
            if($saveImagePath){
                unlink($saveImagePath);
            }
        }
        $profileToUpdate->update([
            'name' => $data['name'],
            'age' => $data['age'],
            'phone' => $data['phone'],
            'address' => $data['address'],
            'cccd' => $data['cccd'],
            'image' => $haveImagePath,
            'description' => $data['description'] ?? $profileToUpdate->description,
        ]);
        return response()->json(['message' => $haveImage]);
    }


    public function setupfaceid(Request $request){
        $user = Auth::user();
        $image = $request->input('image_faceid');
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageData = base64_decode($image);
        $imageName = 'face_' . time() . '.png';
        $imagePath = storage_path('app/public/faceid_image/' . $imageName);
        if(!file_exists(storage_path('app/public/faceid_image'))){
            mkdir(storage_path('app/public/faceid_image'), 0777, true);
        }
        file_put_contents($imagePath, $imageData);
        $user->face_id_image = $imageName;
        $user->save();
        return response()->json(['image' => $imageName]);
    }
  
    
}
