<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\PaymentsCategory;
use Illuminate\Http\Request;
use PDF;


class PaymentsCategoriesApiController extends Controller
{
    //List
    public function list()
    {

        $list = PaymentsCategory::all();

        foreach ($list as $category) {
            $category->total = $category->getTotalAttribute();
            $category->percentage = $category->getPercentageAttribute();
        }

        return $list;
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'budget' => 'required',
            'customer_id' => 'required'
        ]);

        return PaymentsCategory::create($request->all());
    }

    //Destroy
    public function destroy($id)
    {
        $paymentsCategory = PaymentsCategory::find($id);
        $paymentsCategory->delete();
        return $paymentsCategory;
    }
    public function details($id)
    {
        $category = PaymentsCategory::find($id);
        $category->total = $category->getTotalAttribute();
        $category->percentage = $category->getPercentageAttribute();
        $category->payments;
        $category->customer;
        return $category;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'budget' => 'required',
            'customer_id' => 'required'
        ]);

        $category = PaymentsCategory::find($id);
        $category->update($request->all());
        return $category;
    }

    public function report($id)
    {
        $category = PaymentsCategory::find($id);
        $category->total = $category->getTotalAttribute();
        $category->percentage = $category->getPercentageAttribute();

        $category->customer;

        //group payments by month
        $years = Payment::where('category_id', $id)
            ->selectRaw('year(date) as year')
            ->groupBy('year')
            ->orderBy('year', 'asc')
            ->get();

        //For each year, get the payments by month
        $payments_by_month = [];
        foreach ($years as $year) {
            $months = Payment::where('category_id', $id)
                ->selectRaw('month(date) as month')
                ->selectRaw('sum(amount) as total')
                ->whereRaw('year(date) = ?', [$year->year])
                ->groupBy('month')
                ->orderBy('month')
                ->get();

            foreach ($months as $month) {
                //List of payments for the month
                $month->payments = Payment::where('category_id', $id)
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

        return PDF::loadView('/reports/payments_by_category', $data)->stream();
    }
}
