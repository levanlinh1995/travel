<?php
 namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';

    protected $fillable = [
        'commentable_type',
        'commentable_id',
        'user_id',
        'content'
    ];

    public function commentable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo('App\Model\User', 'user_id', 'id');
    }
    
}
