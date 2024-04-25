<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'date',
        'collection_id',
        'customer_id',
        'notes'
    ];
}
