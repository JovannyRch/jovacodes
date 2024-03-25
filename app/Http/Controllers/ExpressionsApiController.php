<?php

namespace App\Http\Controllers;

use App\Models\Expression;
use Illuminate\Http\Request;

class ExpressionsApiController extends Controller
{
    public function create(Request $request)
    {
        $expressionInLowerCase = strtolower($request->expression);
        $expresion = Expression::where('expression', $expressionInLowerCase)->first();
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
        $expresion->expression = $expressionInLowerCase;
        $expresion->type = $request->type;
        $expresion->youtube_url = $request->youtube_url;
        $expresion->origin = $request->origin;
        $expresion->count = 1;
        $expresion->save();
        return response()->json($expresion);
    }

    public function list()
    {
        $expressions = Expression::orderBy('count', 'desc')->paginate(20);
        return response()->json($expressions);
    }

    public function destroy(Request $request)
    {
        $expression = Expression::find($request->id);
        $expression->delete();

        return response()->json(['message' => 'Expression deleted']);
    }

    public function getVideos()
    {
        $expressions = Expression::where('youtube_url', '!=', '')->orderBy('count', 'desc')->paginate(20);
        return response()->json($expressions);
    }

    public function getByType(Request $request)
    {
        if (!in_array($request->type, ['Contingency', 'Contradiction', 'Tautology'])) {
            return response()->json([]);
        }


        $expressions = Expression::where('type', $request->type)->orderBy('count', 'desc')->paginate(20);
        return response()->json($expressions);
    }
}
