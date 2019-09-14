<?php
 namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $table = 'blogs';
    
    public function comments()
    {
        return $this->morphMany('App\Model\Comment', 'commentable');
    }

    public function likes()
    {
        return $this->morphMany('App\Model\Like', 'likeable');
    }

    public function followers()
    {
        return $this->morphMany('App\Model\Follower', 'followable');
    }
    
}
