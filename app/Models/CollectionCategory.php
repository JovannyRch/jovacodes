<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image'
    ];

    public function customers()
    {
        return $this->belongsToMany(Customer::class, 'collection_customer', 'collection_id', 'customer_id');
    }

    public function payments()
    {
        return $this->hasMany(CollectionPayment::class, 'category_id');
    }

    /*  public function getTotalAttribute()
    {
        return CollectionPayment::where('category_id', $this->id)->sum('amount') . '';
    } */
}
