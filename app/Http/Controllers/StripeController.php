<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;
use App\Models\OrderExam;
use Illuminate\Support\Facades\Auth;
use Stripe\Climate\Order;

class StripeController extends Controller
{
    public function session(Request $request){
        $price = $request->input('price');  
        $name = $request->input('name');  
        $exam_id = $request->input('exam_id');
        $lineItems = [];
        $lineItems[] = [
            'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                    'name' => $name,

                ],
                'unit_amount' => $price * 100,
            ],
            'quantity' => 1
        ];

        Stripe::setApiKey(env('STRIPE_SECRET'));
        $session = StripeSession::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('success'),
        ]);
        session(['order_completed'=> true, 'exam_id' => $exam_id, 'price' => $price]);
        return response()->json(['url' => $session->url]);

    }

    public function success(){
        $exam_id = session()->get('exam_id');
        $price = session()->get('price');
        $userId = Auth::id();
        OrderExam::updateOrCreate([
            'user_id' => $userId,
            'exam_id' => $exam_id,
            'price' => $price,
        ]);
        session()->forget('order_completed');
        return view('index');
    }
}
