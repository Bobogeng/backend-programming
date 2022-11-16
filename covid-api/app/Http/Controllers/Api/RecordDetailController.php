<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\Record;
use App\Models\RecordDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RecordDetailController extends Controller
{
    // Membuat fungsi index
    public function index()
    {
        // Membuat variable resources berupa semua data dari table RecordDetails
        $resources = RecordDetail::all();

        // Mengecheck resources jika ada
        if ($resources) {
            // Membuat variable data berupa semua data dari table RecordDetails dan pesan berhasil
            $data = [
                'message' => 'Get all resource',
                'data' => RecordDetail::getAll()
            ];
            // Merespon data dengan status code 200 atau ok
            return response()->json($data, 200);
        } else {
            // Membuat variable data berupa pesan gagal
            $data = [
                'message' => 'Data is empty',
            ];
            // Merespon data dengan status code 404 atau not found
            return response()->json($data, 404);
        }
    }
    // Membuat fungsi store dengan request dari end-point
    public function store(Request $request)
    {
        // Membuat validator untuk memvalidasi requst dari end-point
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'status' => 'required',
            'in_date_at' => 'required|date',
            'out_date_at' => 'required|date|after_or_equal:in_date_at',
        ]);

        // Mengecheck jika terjadi kesalahan / kegagalan saat validasi
        if ($validator->fails()) {
            // Mengembalikan respon error dari validasi
            return response()->json($validator->errors());
        }
        else {
            // Membuat variable dan membuat data baru patient ke table Patients jika belum ada data yang sama dengan request yang didapat
            $patient = Patient::firstOrCreate($request->only('name', 'phone', 'address'));
            // Membuat variable dan membuat data baru record ke table Records
            $record = Record::create($request->only('in_date_at', 'out_date_at'));
            // Membuat variable dan membuat data baru recordDetail ke table RecordDetails
            $recordDetail = RecordDetail::create([
                'status' => $request->status,
                'patient_id' => $patient->id,
                'record_id' => $record->id
            ]);

            // Memanggil fungsi dari model untuk mengembalikan data berupa RecordDetails yang sesuai dengan id parameter tersebut
            $data = $recordDetail->getById($recordDetail->id);

            // Membuat variable data berupa semua satu data dari table RecordDetails dan pesan berhasil
            $response = [
                'message' => 'Resource is added successfully',
                'data' => $data
            ];

            // Merespon data dengan status code 201 atau created success
            return response()->json($response, 201);
        }
    }
    // Membuat fungsi store dengan paramater dari end-point berupa id
    public function show($id)
    {
        // Membuat variable resource berupa satu data dari table RecordDetails
        $resource = RecordDetail::find($id);
        
        // Mengecheck resource jika ada
        if ($resource) {
            // Membuat variable data berupa satu data dari table RecordDetails dan pesan berhasil
            $data = [
                'message' => 'Get detail resource',
                'data' => $resource->getById($id)
            ];
            // Merespon data dengan status code 200 atau ok
            return response()->json($data, 200);
        }
        else {
            // Membuat variable data berupa pesan gagal
            $data = [
                'message' => 'Resource not found'
            ];
            // Merespon data dengan status code 404 atau not found
            return response()->json($data, 404);
        }
    }
    // Membuat fungsi update dengan request dari end-point dan parameter berupa id
    public function update(Request $request, $id)
    {
        // Membuat variable resource berupa satu data dari table RecordDetails
        $resource = RecordDetail::find($id);

        // Mengecheck resource jika ada
        if ($resource) {
            // Membuat validator untuk memvalidasi requst dari end-point
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'phone' => 'required',
                'address' => 'required',
                'status' => 'required',
                'in_date_at' => 'required|date',
                'out_date_at' => 'required|date|after_or_equal:in_date_at',
            ]);
    
            // Mengecheck jika terjadi kesalahan / kegagalan saat validasi
            if ($validator->fails()) {
                // Mengembalikan respon error dari validasi
                return response()->json($validator->errors());
            }
            else {
                // Mengupdate 1 data di table patient berdasarkan foreign key dari table RecordDetails
                RecordDetail::find($id)->patient()->update($request->only('name', 'phone', 'address'));
                // Mengupdate 1 data di table record berdasarkan foreign key dari table RecordDetails
                RecordDetail::find($id)->record()->update($request->only('in_date_at', 'out_date_at'));
                // Mengupdate 1 data di table RecordDetails
                RecordDetail::find($id)->update($request->only('status'));
    
                // Memanggil fungsi dari model untuk mengembalikan data berupa RecordDetails yang sesuai dengan id parameter tersebut
                $data = $resource->getById($id);
    
                // Membuat variable response berupa satu data dari table RecordDetails dan pesan berhasil
                $response = [
                    'message' => 'Resource is update successfully',
                    'data' => $data
                ];
    
                // Merespon data dengan status code 201 atau created success
                return response()->json($response, 201);
            }
        }
        else {
            // Membuat variable data berupa pesan gagal
            $data = [
                'message' => 'Resource not found'
            ];
            // Merespon data dengan status code 404 atau not found
            return response()->json($data, 404);
        }
    }
    // Membuat fungsi destroy dengan paramater dari end-point berupa id
    public function destroy($id)
    {
        // Membuat variable resource berupa satu data dari table RecordDetails
        $resource = RecordDetail::find($id);
        
        // Mengecheck resource jika ada
        if ($resource) {
            // Membuat variable resources berupa satu data dari table RecordDetails yang foreign key dari patient sama dengan paramater id yang didapat
            $resources = RecordDetail::where('patient_id', $resource->patient_id)->get();
            
            // Mengecheck resources jika <= 1
            if ($resources->count() <= 1) {
                // Memanggil fungsi dari model untuk menghapus 1 data dari RecordDetails dan menghapus seluruh data dari foreign key yang terhubung oleh foreign key
                $resource->deleteAll();
            } else {
                // Memanggil fungsi dari model untuk menghapus 1 data dari RecordDetails dan menghapus data dari foreign key record
                $resource->record()->delete();
                // Memanggil fungsi dari model untuk menghapus 1 data dari RecordDetails
                $resource->delete();
            }

            // Membuat variable data berupa pesan berhasil
            $data = [
                'message' => 'Resource is deleted successfully',
            ];
    
            // Merespon data dengan status code 200 atau ok
            return response()->json($data, 200);
        }
        else {
            // Membuat variable data berupa pesan gagal
            $data = [
                'message' => 'Resource not found'
            ];
            // Merespon data dengan status code 404 atau not found
            return response()->json($data, 404);
        }
    }
    // Membuat fungsi search dengan paramater dari end-point berupa name
    public function search($name)
    {
        // Membuat variable resources berupa semua data dari table RecordDetails dimana nama patientnya terdapat string yang diawali dengan paramater yang didapat dari name 
        $resources = RecordDetail::whereRelation('patient', 'name', 'like', $name.'%')->get();

        // Mengecheck resources jika >= 1
        if ($resources->count() >= 1) {
            // Membuat variable data berupa semua data dari table RecordDetails berdasarkan nama patient dan pesan berhasil
            $data = [
                'message' => 'Get searched resource',
                'data' => RecordDetail::getByName($name)
            ];
    
            // Merespon data dengan status code 200 atau ok
            return response()->json($data, 200);
        }
        else {
            // Membuat variable data berupa pesan gagal
            $data = [
                'message' => 'Resource not found',
            ];
            // Merespon data dengan status code 404 atau not found
            return response()->json($data, 404);
        }
    }
    // Membuat fungsi positive
    public function positive()
    {
        // Membuat variable resources berupa semua data dari table RecordDetails dimana statusnya adalah positive
        $resources = RecordDetail::all()->where('status', 'positive');

        // Membuat variable data berupa semua data dari table RecordDetails berdasarkan status positive resource, pesan berhasil dan total row data yang ada
        $data = [
            'message' => 'Get positive resource',
            'total' => $resources->count(),
            'data' => RecordDetail::getByPositive()
        ];

        // Merespon data dengan status code 200 atau ok
        return response()->json($data, 200);
    }
    // Membuat fungsi recovered
    public function recovered()
    {
        // Membuat variable resources berupa semua data dari table RecordDetails dimana statusnya adalah recovered
        $resources = RecordDetail::all()->where('status', 'recovered');

        // Membuat variable data berupa semua data dari table RecordDetails berdasarkan status recovered resource, pesan berhasil dan total row data yang ada
        $data = [
            'message' => 'Get recovered resource',
            'total' => $resources->count(),
            'data' => RecordDetail::getByRecovered()
        ];

        // Merespon data dengan status code 200 atau ok
        return response()->json($data, 200);
    }
    // Membuat fungsi dead
    public function dead()
    {
        // Membuat variable resources berupa semua data dari table RecordDetails dimana statusnya adalah dead
        $resources = RecordDetail::all()->where('status', 'dead');

        // Membuat variable data berupa semua data dari table RecordDetails berdasarkan status dead resource, pesan berhasil dan total row data yang ada
        $data = [
            'message' => 'Get dead resource',
            'total' => $resources->count(),
            'data' => RecordDetail::getByDead()
        ];

        // Merespon data dengan status code 200 atau ok
        return response()->json($data, 200);
    }
}
