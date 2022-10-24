<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnimalController extends Controller
{
    public $data = array("kucing", "ayam", "ikan");
    public function index() {
        echo "Menampilkan data animals\n";
        foreach ($this->data as $value) {
            echo "- $value\n";
        }
        // $response = [
        //     "data" => $this->data
        // ];
        // return response()->json($response, Response::HTTP_OK);
    }
    public function store(Request $request) {
        echo "Menampilkan hewan baru\n";
        echo "Menampilkan data animals\n";
        array_push($this->data, $request->name);
        foreach ($this->data as $value) {
            echo "- $value\n";
        }
    }
    public function update(Request $request, $id) {
        echo "Menampilkan data hewan id $id\n";
        echo "Menampilkan data animals\n";
        if ($this->data[$id]) {
            $this->data[$id] = $request->name;
        }
        foreach ($this->data as $value) {
            echo "- $value\n";
        }
    }
    public function destroy($id) {
        echo "Menampilkan data hewan id $id\n";
        echo "Menampilkan data animals\n";
        unset($this->data[$id]);
        foreach ($this->data as $value) {
            echo "- $value\n";
        }
    }
}
