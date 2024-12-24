<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderExam extends Model
{
    protected $guarded = [];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function exam(){
        return $this->belongsTo(Exam::class);
    }
}
