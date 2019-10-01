<?php
 namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profiles';

    protected $dates = [
        'date_of_birth',
    ];

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function user()
    {
        $this->belongsTo('App\Model\User', 'user_id', 'id');
    }
    
}
