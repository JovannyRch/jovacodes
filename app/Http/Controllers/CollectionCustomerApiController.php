<?php

namespace App\Http\Controllers;

use App\Models\CollectionCustomer;
use Illuminate\Http\Request;

class CollectionCustomerApiController extends Controller
{

    public function create(Request $request)
    {
        $request->validate([
            'category_id' => 'required',
            'customer_id' => 'required',
        ]);

        return CollectionCustomer::create($request->all());
    }


    public function destroy($id)
    {
        $collectionCustomer = CollectionCustomer::find($id);
        $collectionCustomer->delete();
        return $collectionCustomer;
    }
}
