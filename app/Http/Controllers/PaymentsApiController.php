<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\PaymentsCategory;
use Illuminate\Http\Request;

class PaymentsApiController extends Controller
{

    public function list()
    {
        $total = Payment::sum('amount');
        $list = Payment::orderBy('date', 'asc')->get();

        return [
            'total' => $total,
            'list' => $list
        ];
    }

    public function create(Request $request)
    {
        $request->validate([
            'category_id' => 'required',
            'amount' => 'required',
            'date' => 'required'
        ]);

        return Payment::create($request->all());
    }

    public function destroy($id)
    {
        $payments = Payment::find($id);
        $payments->delete();
        return $payments;
    }


    public function getByCategory($category_id)
    {

        $category = PaymentsCategory::find($category_id);

        $total = Payment::where('category_id', $category_id)->sum('amount');
        $list = Payment::where('category_id', $category_id)->orderBy('date', 'asc')->get();

        return [
            'total' => $total,
            'list' => $list
        ];
    }

    //Update
    public function update(Request $request, $id)
    {
        $request->validate([
            'category_id' => 'required',
            'amount' => 'required',
            'date' => 'required'
        ]);

        $payment = Payment::find($id);
        $payment->update($request->all());
        return $payment;
    }
}
