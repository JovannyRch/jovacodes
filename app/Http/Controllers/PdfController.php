<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;

class PdfController extends Controller
{
    //generatePDF
    public function generatePDF()
    {
        $pdf = PDF::loadView('sample');
        return $pdf->stream();
    }
}
