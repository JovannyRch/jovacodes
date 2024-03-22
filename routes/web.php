<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpressionsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/expressions', [ExpressionsController::class, 'index'])->middleware(['auth', 'verified'])->name('expressions');
Route::get('/expressions/{id}/details', [ExpressionsController::class, 'edit'])->middleware(['auth', 'verified'])->name('expressions.details');
Route::get('/expressions/pdf', [ExpressionsController::class, 'generatePdf'])->name('expressions.pdf');
Route::patch('/expressions/{id}', [ExpressionsController::class, 'update'])->middleware(['auth', 'verified'])->name('expressions.update');
Route::delete('/expressions/{id}', [ExpressionsController::class, 'destroy'])->middleware(['auth', 'verified'])->name('expressions.destroy');


Route::get('/expressions/{id}/solve', [ExpressionsController::class, 'solve'])->middleware(['auth', 'verified'])->name('expressions.solve');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
