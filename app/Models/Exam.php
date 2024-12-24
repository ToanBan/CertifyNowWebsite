<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $guarded = [];

    public function question(){
        return $this->hasMany(Question::class);
    }

    public function orderexam(){
        return $this->hasMany(OrderExam::class);
    }
}
