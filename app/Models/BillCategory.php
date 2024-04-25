<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function bills()
    {
        $bills = $this->hasMany(BillPayment::class, 'category_id');
        $bills->orderBy('date', 'desc');
        return $bills;
    }

    public function getTotalAttribute()
    {
        return BillPayment::where('category_id', $this->id)->sum('amount') . '';
    }
}
