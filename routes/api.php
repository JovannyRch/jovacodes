<?php

use App\Http\Controllers\CustomersApiController;
use App\Http\Controllers\ExpressionsApiController;
use App\Http\Controllers\PaymentsApiController;
use App\Http\Controllers\PaymentsCategoriesApiController;
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



//ROUTES FOR PAYMENTS APP

Route::get('/customers', [CustomersApiController::class, 'list'])->name('customer.list');
Route::post('/customers', [CustomersApiController::class, 'create'])->name('customer.create');
Route::delete('/customers/{id}', [CustomersApiController::class, 'destroy'])->name('customer.destroy');
Route::put('/customers/{id}', [CustomersApiController::class, 'update'])->name('customer.update');

//Payments Categories
Route::get('/payments_categories', [PaymentsCategoriesApiController::class, 'list'])->name('payments_categories.list');

Route::get('/payments_categories/{id}/details', [PaymentsCategoriesApiController::class, 'details'])->name('payments_categories.details');
Route::post('/payments_categories', [PaymentsCategoriesApiController::class, 'create'])->name('payments_categories.create');
Route::delete('/payments_categories/{id}', [PaymentsCategoriesApiController::class, 'destroy'])->name('payments_categories.destroy');
Route::put('/payments_categories/{id}', [PaymentsCategoriesApiController::class, 'update'])->name('payments_categories.update');


//Payments
Route::get('/payments', [PaymentsApiController::class, 'list'])->name('payments.list');
Route::get('/payments/category/{category_id}', [PaymentsApiController::class, 'getByCategory'])->name('payments.getByCategory');
Route::post('/payments', [PaymentsApiController::class, 'create'])->name('payments.create');
Route::delete('/payments/{id}', [PaymentsApiController::class, 'destroy'])->name('payments.destroy');
Route::put('/payments/{id}', [PaymentsApiController::class, 'update'])->name('payments.update');
