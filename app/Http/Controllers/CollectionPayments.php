<?php

namespace App\Http\Controllers;

use App\Models\CollectionPayment;
use Illuminate\Http\Request;

class CollectionPayments extends Controller
{
    //List
    public function list()
    {

        $list = CollectionPayment::all();


        return $list;
    }

    public function create(Request $request)
    {
        $request->validate([
            'collection_id' => 'required',
            'customer_id' => 'required',
            'amount' => 'required',
            'date' => 'required'
        ]);

        return CollectionPayment::create($request->all());
    }

    //Destroy
    public function destroy($id)
    {
        $paymentsCategory = CollectionPayment::find($id);
        $paymentsCategory->delete();
        return $paymentsCategory;
    }

    public function details($id)
    {
        $category = CollectionPayment::find($id);
        $category->total = $category->getTotalAttribute();
        $category->customers;

        return $category;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $category = CollectionPayment::find($id);
        $category->update($request->all());
        return $category;
    }
}
