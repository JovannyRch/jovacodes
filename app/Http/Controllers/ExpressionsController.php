<?php

namespace App\Http\Controllers;

use PDF;
use App\Models\Expression;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpressionsController extends Controller
{
    public function index()
    {
        $expressions = Expression::orderBy('count', 'desc')->paginate(50);
        return Inertia::render('Expressions/Index', ['expressions' => $expressions]);
    }

    public function edit(Request $request)
    {
        $expression = Expression::find($request->id);
        return Inertia::render('Expressions/Edit', ['expression' => $expression]);
    }

    public function update(Request $request)
    {
        $expression = Expression::find($request->id);

        $expression->type = $request->type;
        $expression->youtube_url = $request->youtube_url;

        $expression->save();
        return redirect()->route('expressions');
    }


    public function solve(Request $request)
    {
        $expression = Expression::find($request->id);
        return Inertia::render('Expressions/Solve', ['expression' => $expression]);
    }

    public function destroy(Request $request)
    {
        $expression = Expression::find($request->id);
        $expression->delete();
        return redirect()->route('expressions');
    }

    public function createPdf(Request $request)
    {
        $expression = Expression::find($request->id);
        $pdf = PDF::loadView('truth_table_pdf_template', ['expressions' => [$expression]]);
        return $pdf->stream();
    }

    public function generatePdf(Request $request)
    {

        $table = $request->table;



        $headers = $table[0];
        $body = array_slice($table, 1);


        $pdf = PDF::loadView(
            'truth_table_pdf_template',
            [
                'variables' => $request->variables,
                'expression' => $request->expression,
                'n' => $request->n,
                'headers' => $headers,
                'body' => $body
            ]
        );



        return $pdf->stream();
    }
}
