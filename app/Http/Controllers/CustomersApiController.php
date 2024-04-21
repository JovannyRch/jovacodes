<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomersApiController extends Controller
{


    public function list()
    {
        return Customer::all();
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'phone_number' => 'required|unique:customers'
        ]);

        return Customer::create($request->all());
    }

    public function destroy($id)
    {
        $customer = Customer::find($id);
        $customer->delete();
        return $customer;
    }
}
