<?php

use App\Http\Controllers\ExpressionsApiController;
use App\Http\Controllers\PdfController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/pdf', [PdfController::class, 'generatePDF']);
Route::get('/pdf/test', [PdfController::class, 'testView']);


Route::post('/expression', [ExpressionsApiController::class, 'create']);
Route::delete('/expression/{id}', [ExpressionsApiController::class, 'destroy'])->name('expression.destroy');
