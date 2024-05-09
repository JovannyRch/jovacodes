<?php

namespace App\Http\Controllers;

use App\Models\BillCategory;
use App\Models\BillPayment;
use Illuminate\Http\Request;
use PDF;


class BillCategoriesApiController extends Controller
{

    public function list()
    {
        return BillCategory::all();
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        return BillCategory::create($request->all());
    }

    public function destroy($id)
    {
        $billCategory = BillCategory::find($id);
        $billCategory->delete();
        return $billCategory;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $billCategory = BillCategory::find($id);
        $billCategory->update($request->all());
        return $billCategory;
    }

    public function details($id)
    {
        $billCategory = BillCategory::find($id);
        $billCategory->bills;
        $billCategory->total = $billCategory->getTotalAttribute();
        return $billCategory;
    }

    public function report($id)
    {
        $category = BillCategory::find($id);
        $category->total = $category->getTotalAttribute();

        $category->customer;

        $years = BillPayment::where('category_id', $id)
            ->selectRaw('year(date) as year')
            ->groupBy('year')
            ->orderBy('year', 'asc')
            ->get();

        //For each year, get the payments by month
        $payments_by_month = [];
        foreach ($years as $year) {
            $months = BillPayment::where('category_id', $id)
                ->selectRaw('month(date) as month')
                ->selectRaw('sum(amount) as total')
                ->whereRaw('year(date) = ?', [$year->year])
                ->groupBy('month')
                ->orderBy('month')
                ->get();

            foreach ($months as $month) {
                //List of payments for the month
                $month->payments = BillPayment::where('category_id', $id)
                    ->whereRaw('year(date) = ?', [$year->year])
                    ->whereRaw('month(date) = ?', [$month->month])
                    ->orderBy('date')
                    ->get();
            }

            $payments_by_month[$year->year] = $months;
        }


        $data = [
            'category' => $category,
            'customer' => $category->customer,
            'payments_by_year_by_month' => $payments_by_month
        ];

        return PDF::loadView('/reports/bills_by_category', $data)->stream();
    }
}
