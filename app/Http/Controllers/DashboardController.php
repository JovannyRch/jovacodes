<?php

namespace App\Http\Controllers;

use App\Models\Expression;
use App\Models\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $today_sum = Expression::whereDate('created_at', today())->sum('count');
        $month_sum = Expression::whereMonth('created_at', today())->sum('count');


        $expressions_current_week = Expression::selectRaw('DATE(created_at) as date, sum(count) as total')
            ->where('created_at', '>=', now()->subDays(6))
            ->groupBy('date')
            ->orderBy('date')
            ->get();


        $expressions_previous_week = Expression::selectRaw('DATE(created_at) as date, sum(count) as total')
            ->where('created_at', '>=', now()->subDays(14))
            ->where('created_at', '<', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();


        $sum_of_expressions = Expression::sum('count');

        $count_pdf_created = Log::where('action', 'create_pdf')->count();


        $latest_expressions = Expression::orderBy('created_at', 'desc')->take(20)->get();

        return Inertia::render('Dashboard', [
            'expressions' => $expressions_current_week,
            'expressions_previous_week' => $expressions_previous_week,
            'sum_of_expressions' => $sum_of_expressions,
            'latest_expressions' => $latest_expressions,
            'today_sum' => $today_sum,
            'month_sum' => $month_sum,
            'count_pdf_created' => $count_pdf_created
        ]);
    }
}
