<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentsCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'budget',
        'customer_id'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function payments()
    {

        $payments = $this->hasMany(Payment::class, 'category_id');

        $payments->orderBy('date', 'desc');

        return $payments;
    }



    public function getTotalAttribute()
    {
        return Payment::where('category_id', $this->id)->sum('amount') . '';
    }

    public function getPercentageAttribute()
    {
        return $this->budget > 0 ? ($this->total * 100 / $this->budget) . "" : "0.0";
    }
}
