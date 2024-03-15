<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/expressions', [App\Http\Controllers\ExpressionsController::class, 'list']);
