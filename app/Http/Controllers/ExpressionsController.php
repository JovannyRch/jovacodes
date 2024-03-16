<?php

namespace App\Http\Controllers;

use App\Models\Expression;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpressionsController extends Controller
{
    public function index()
    {
        $expressions = Expression::orderBy('count', 'desc')->paginate(10);
        return Inertia::render('Expressions/Index', ['expressions' => $expressions]);
    }

    public function edit(Request $request)
    {
        $expression = Expression::find($request->id);
        return Inertia::render('Expressions/Edit', ['expression' => $expression]);
    }

    //Update
    public function update(Request $request)
    {
        $expression = Expression::find($request->id);

        $expression->type = $request->type;
        $expression->youtube_url = $request->youtube_url;

        $expression->save();
        return redirect()->route('expressions');
    }
}
