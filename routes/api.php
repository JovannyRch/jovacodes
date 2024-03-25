<?php

use App\Http\Controllers\ExpressionsApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('/expression', [ExpressionsApiController::class, 'create']);
Route::delete('/expression/{id}', [ExpressionsApiController::class, 'destroy'])->name('expression.destroy');

Route::get('/expressions/videos', [ExpressionsApiController::class, 'getVideos'])->name('expression.getVideos');
Route::get('/expressions/type/{type}', [ExpressionsApiController::class, 'getByType'])->name('expression.getByType');
Route::get('/expressions', [ExpressionsApiController::class, 'list'])->name('expression.list');
