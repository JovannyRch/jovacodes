<?php

namespace App\Http\Controllers;

use App\Models\BillCategory;
use App\Models\BillPayment;
use Illuminate\Http\Request;

class BillPaymentsApiController extends Controller
{
    public function list()
    {
        return BillPayment::all();
    }

    public function create(Request $request)
    {
        $request->validate([
            'category_id' => 'required',
            'amount' => 'required',
            'date' => 'required'
        ]);

        return BillPayment::create($request->all());
    }

    public function destroy($id)
    {
        $billPayment = BillPayment::find($id);
        $billPayment->delete();
        return $billPayment;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'bill_id' => 'required',
            'amount' => 'required',
            'date' => 'required'
        ]);

        $billPayment = BillPayment::find($id);
        $billPayment->update($request->all());
        return $billPayment;
    }

    public function getByCategory($category_id)
    {
        $category = BillCategory::find($category_id);
        return $category->bills;
    }
}
