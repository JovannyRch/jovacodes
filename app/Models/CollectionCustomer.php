<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionCustomer extends Model
{
    use HasFactory;

    protected $table = 'collection_customer';


    protected $fillable = [
        'collection_id',
        'customer_id',
    ];

    public function category()
    {
        return $this->belongsTo(CollectionCategory::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
