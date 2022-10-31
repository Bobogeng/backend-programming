<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index() {
        $students = Student::all();
        $data = [
            'message' => 'Get all students',
            'data' => $students
        ];
        return response()->json($data, 200);
    }
    public function store(Request $request) {
        $input = [
            'nama' => $request->nama,
            'nim' => $request->nim,
            'email' => $request->email,
            'jurusan' => $request->jurusan,
        ];

        $student = Student::create($input);

        $data = [
            'message' => 'Student is created successfully',
            'data' => $student,
        ];

        return response()->json($data, 201);
    }
    public function update(Request $request, $id) {
        $input = [
            'nama' => $request->nama,
            'nim' => $request->nim,
            'email' => $request->email,
            'jurusan' => $request->jurusan,
        ];

        Student::find($id)->update($input);
        $student = Student::find($id);

        $data = [
            'message' => 'Student is updated successfully',
            'data' => $student,
        ];

        return response()->json($data, 200);
    }
    public function destroy($id) {
        Student::destroy($id);
        $student = Student::all();

        $data = [
            'message' => 'Student is deleted successfully',
            'data' => $student,
        ];

        return response()->json($data, 200);
    }
}
