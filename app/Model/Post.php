<?php
 namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';

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

    public function user()
    {
        return $this->belongsTo('App\Model\User', 'user_id', 'id');
    }
    
}
