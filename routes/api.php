<?php

use App\Http\Controllers\BillCategoriesApiController;
use App\Http\Controllers\BillPaymentsApiController;
use App\Http\Controllers\CollectionCategoriesApiController;
use App\Http\Controllers\CollectionPayments;
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

Route::get('/payments_categories/{id}/report', [PaymentsCategoriesApiController::class, 'report'])->name('payments_categories.report');


//Payments
Route::get('/payments', [PaymentsApiController::class, 'list'])->name('payments.list');
Route::get('/payments/category/{category_id}', [PaymentsApiController::class, 'getByCategory'])->name('payments.getByCategory');
Route::post('/payments', [PaymentsApiController::class, 'create'])->name('payments.create');
Route::delete('/payments/{id}', [PaymentsApiController::class, 'destroy'])->name('payments.destroy');
Route::put('/payments/{id}', [PaymentsApiController::class, 'update'])->name('payments.update');


//Bill Categories
Route::get('/bill_categories', [BillCategoriesApiController::class, 'list'])->name('bill_categories.list');
Route::post('/bill_categories', [BillCategoriesApiController::class, 'create'])->name('bill_categories.create');
Route::delete('/bill_categories/{id}', [BillCategoriesApiController::class, 'destroy'])->name('bill_categories.destroy');
Route::put('/bill_categories/{id}', [BillCategoriesApiController::class, 'update'])->name('bill_categories.update');
Route::get('/bill_categories/{id}/details', [BillCategoriesApiController::class, 'details'])->name('bill_categories.details');



//Bills
Route::get('/bills', [BillPaymentsApiController::class, 'list'])->name('bills.list');
Route::get('/bills/category/{category_id}', [BillPaymentsApiController::class, 'getByCategory'])->name('bills.getByCategory');
Route::post('/bills', [BillPaymentsApiController::class, 'create'])->name('bills.create');
Route::delete('/bills/{id}', [BillPaymentsApiController::class, 'destroy'])->name('bills.destroy');
Route::put('/bills/{id}', [BillPaymentsApiController::class, 'update'])->name('bills.update');


//Collections Categories
Route::get('/collections_categories', [CollectionCategoriesApiController::class, 'list'])->name('collections_categories.list');
Route::post('/collections_categories', [CollectionCategoriesApiController::class, 'create'])->name('collections_categories.create');
Route::delete('/collections_categories/{id}', [CollectionCategoriesApiController::class, 'destroy'])->name('collections_categories.destroy');
Route::put('/collections_categories/{id}', [CollectionCategoriesApiController::class, 'update'])->name('collections_categories.update');
Route::get('/collections_categories/{id}/details', [CollectionCategoriesApiController::class, 'details'])->name('collections_categories.details');

Route::post('/collections_categories/{id}/addCustomer', [CollectionCategoriesApiController::class, 'addCustomer'])->name('collections_categories.addCustomer');
Route::delete('/collections_categories/{id}/removeCustomer/{customer_id}', [CollectionCategoriesApiController::class, 'removeCustomer'])->name('collections_categories.removeCustomer');
Route::get('/collections_categories/{id}/customer/{customer_id}/payments', [CollectionCategoriesApiController::class, 'getPaymentsByCustomer'])->name('collections_categories.getPaymentsByCustomer');


Route::post('/collections_payments', [CollectionPayments::class, 'create'])->name('collections_payments.create');
Route::delete('/collections_payments/{id}', [CollectionPayments::class, 'destroy'])->name('collections_payments.destroy');
