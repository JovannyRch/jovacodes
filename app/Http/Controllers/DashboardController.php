<?php

namespace App\Http\Controllers;

use App\Models\Expression;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $expressions = Expression::selectRaw('DATE(created_at) as date, sum(count) as total')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();


        $sum_of_expressions = Expression::sum('count');

        //Average per day
        $oldest_date = $expressions->first()->date;
        $newest_date = $expressions->last()->date;

        //Parse to Dates
        $oldest_date = \Carbon\Carbon::parse($oldest_date);
        $newest_date = \Carbon\Carbon::parse($newest_date);

        $difference = $oldest_date->diffInDays($newest_date);

        $average = $sum_of_expressions / $difference;



        return Inertia::render('Dashboard', [
            'expressions' => $expressions,
            'sum_of_expressions' => $sum_of_expressions,
            'average' => $average,
            'difference' => $difference,
        ]);
    }
}
