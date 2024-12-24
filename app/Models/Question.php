<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $guarded = [];

    public function exam(){
        return $this->belongsTo(Exam::class);
    }

    public function answer(){
        return $this->hasMany(Answer::class);
    }
}
