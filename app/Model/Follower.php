<?php
 namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    protected $table = 'followers';
    
    public function followable()
    {
        return $this->morphTo();
    }
}
