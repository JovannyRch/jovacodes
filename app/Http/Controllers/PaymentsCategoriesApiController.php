<?php

namespace App\Http\Controllers;

use App\Models\PaymentsCategory;
use Illuminate\Http\Request;

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
}
