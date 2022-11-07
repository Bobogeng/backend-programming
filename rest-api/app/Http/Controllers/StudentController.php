<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index() {
        $students = Student::all();
        if (!$students->isEmpty()) {
            $data = [
                'message' => 'Get all students',
                'data' => $students
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => 'Students not found',
            ];
            return response()->json($data, 404);
        }
    }
    public function show($id) {
        $student = Student::find($id);
        if ($student) {
            $data = [
                'message' => 'Get detail student',
                'data' => $student
            ];
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => 'Student not found',
            ];
            return response()->json($data, 404);
        }
    }
    public function store(Request $request) {
        $student = [
            'nama' => $request->nama,
            'nim' => $request->nim,
            'email' => $request->email,
            'jurusan' => $request->jurusan,
        ];

        foreach ($student as $key => $value) {
            if (!$key || !$value) {
                $data = [
                    'message' => $key . ' is required',
                ];
                
                return response()->json($data, 404);
            }
        }

        $data = [
            'message' => 'Student is created successfully',
            'data' => Student::create($student),
        ];

        return response()->json($data, 201);
    }
    public function update(Request $request, $id) {
        $student = Student::find($id);
        if ($student) {
            $input = [
                'nama' => $request->nama ?? $student->nama,
                'nim' => $request->nim ?? $student->nim,
                'email' => $request->email ?? $student->email,
                'jurusan' => $request->jurusan ?? $student->jurusan,
            ];
    
            $student->update($input);
    
            $data = [
                'message' => 'Student is updated successfully',
                'data' => $student,
            ];
    
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => 'Student not found',
            ];
    
            return response()->json($data, 404);
        }
    }
    public function destroy($id) {
        $student = Student::find($id);
        if ($student) {
            $student->delete();

            $data = [
                'message' => 'Student is deleted successfully',
            ];
    
            return response()->json($data, 200);
        } else {
            $data = [
                'message' => 'Student not found',
            ];
    
            return response()->json($data, 404);
        }
    }
}
