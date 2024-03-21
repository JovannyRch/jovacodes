<?php

namespace App\Http\Controllers;

use PDF;

class PdfController extends Controller
{
    public function generatePDF()
    {
        $pdf = PDF::loadView('sample');
        return $pdf->stream();
    }

    public function testView()
    {
        return view('sample');
    }
}
