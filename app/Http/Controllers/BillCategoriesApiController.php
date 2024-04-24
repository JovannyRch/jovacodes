<?php

namespace App\Http\Controllers;

use App\Models\BillCategory;
use Illuminate\Http\Request;

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
}
