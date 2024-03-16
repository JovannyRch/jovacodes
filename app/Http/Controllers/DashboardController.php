<?php

namespace App\Http\Controllers;

use App\Models\Expression;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        //Get expressions sum last 7 days each day
        $expressions = Expression::selectRaw('DATE(created_at) as date, sum(count) as total')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();


        return Inertia::render('Dashboard', ['expressions' => $expressions]);
    }
}
