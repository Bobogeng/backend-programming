<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::all();

        $response = [
            'message' => 'berashil cuy',
            'data' => $students
        ];

        return response()->json($response, 200);
    }
}
