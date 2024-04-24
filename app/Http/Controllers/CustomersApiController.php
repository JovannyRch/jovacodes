<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomersApiController extends Controller
{


    public function list()
    {
        return Customer::orderBy('name', 'asc')->get();
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

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'phone_number' => 'required|unique:customers,phone_number,' . $id
        ]);

        $customer = Customer::find($id);
        $customer->update($request->all());
        return $customer;
    }
}
