<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;

class LogsController extends Controller
{

    public function createPdf(Request $request)
    {
        $log = new Log();
        $log->action = 'create_pdf';
        $log->origin = $request->origin ?? 'app';
        $log->description = 'Created a pdf from expression: ' . $request->expression;
        $log->save();
    }
}
