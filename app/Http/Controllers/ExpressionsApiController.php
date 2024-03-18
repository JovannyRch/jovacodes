<?php

namespace App\Http\Controllers;

use App\Models\Expression;
use Illuminate\Http\Request;

class ExpressionsApiController extends Controller
{
    public function create(Request $request)
    {
        $expresion = Expression::where('expression', $request->expression)->first();
        if ($expresion) {
            $expresion->count = $expresion->count + 1;
            $expresion->save();

            if ($request->type && !$expresion->type) {
                $expresion->type = $request->type;
                $expresion->save();
            }

            return response()->json($expresion);
        }

        $expresion = new Expression();
        $expresion->expression = $request->expression;
        $expresion->type = $request->type;
        $expresion->youtube_url = $request->youtube_url;
        $expresion->origin = $request->origin;
        $expresion->count = 1;
        $expresion->save();
        return response()->json($expresion);
    }

    public function list()
    {
        $expressions = Expression::orderBy('count', 'desc')->get();
        return view('expressions', ['expressions' => $expressions]);
    }

    public function destroy(Request $request)
    {
        $expression = Expression::find($request->id);
        $expression->delete();

        return response()->json(['message' => 'Expression deleted']);
    }
}
