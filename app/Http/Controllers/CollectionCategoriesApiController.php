<?php

namespace App\Http\Controllers;

use App\Models\CollectionCategory;
use App\Models\CollectionCustomer;
use App\Models\CollectionPayment;
use Illuminate\Http\Request;


class CollectionCategoriesApiController extends Controller
{

    public function list()
    {
        return  CollectionCategory::all();
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        return CollectionCategory::create($request->all());
    }

    //Destroy
    public function destroy($id)
    {
        $paymentsCategory = CollectionCategory::find($id);
        $paymentsCategory->delete();
        return $paymentsCategory;
    }

    public function details($id)
    {
        $category = CollectionCategory::find($id);
        $category->customers;

        return $category;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $category = CollectionCategory::find($id);
        $category->update($request->all());
        return $category;
    }

    //addCustomer
    public function addCustomer(Request $request, $id)
    {
        $request->validate([
            'customer_id' => 'required',
        ]);

        $collectionCustomer = CollectionCustomer::where('collection_id', $id)->where('customer_id', $request->customer_id)->first();

        if ($collectionCustomer) {
            return response()->json(['error' => 'Customer already in category'], 400);
        }

        $request->merge(['collection_id' => $id]);

        return CollectionCustomer::create($request->all());
    }

    public function removeCustomer($id, $customerId)
    {
        $collectionCustomer = CollectionCustomer::where('collection_id', $id)->where('customer_id', $customerId)->first();

        if (!$collectionCustomer) {
            return response()->json(['error' => 'Customer not in category'], 400);
        }

        $collectionCustomer->delete();
        return $collectionCustomer;
    }

    //getPayments by customer id
    public function getPaymentsByCustomer($id, $customerId)
    {
        $collectionCustomer = CollectionCustomer::where('collection_id', $id)->where('customer_id', $customerId)->first();

        if (!$collectionCustomer) {
            return response()->json(['error' => 'Customer not in category'], 400);
        }

        $payments = CollectionPayment::where('collection_id', $id)->where('customer_id', $customerId)->orderBy('date', 'desc')->get();

        return $payments;
    }

    public function addPayment(Request $request, $id)
    {
        $request->validate([
            'amount' => 'required',
            'date' => 'required',
            'customer_id' => 'required'
        ]);

        $customerId = $request->customer_id;

        $collectionCustomer = CollectionCustomer::where('collection_id', $id)->where('customer_id', $customerId)->first();

        if (!$collectionCustomer) {
            return response()->json(['error' => 'Customer not in category'], 400);
        }

        $request->merge(['collection_id' => $id]);
        $request->merge(['customer_id' => $customerId]);

        return CollectionPayment::create($request->all());
    }
}
