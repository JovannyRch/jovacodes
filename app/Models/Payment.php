<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'date',
        'category_id',
        'notes'
    ];

    public function category()
    {
        return $this->belongsTo(PaymentsCategory::class);
    }
}
