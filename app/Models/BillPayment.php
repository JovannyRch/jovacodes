<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillPayment extends Model
{
    use HasFactory;

    protected $table = 'bills';

    protected $fillable = [
        'amount',
        'date',
        'category_id',
        'notes'
    ];
}
