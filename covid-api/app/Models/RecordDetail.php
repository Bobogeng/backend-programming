<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class RecordDetail extends Model
{
    use HasFactory;

    // Mendaftarkan atribut (nama kolom) yang bisa kita isi ketika melakukan insert atau update ke database.
    protected $fillable = [
        'status',
        'patient_id',
        'record_id',
    ];

    // membuat fungsi patient
    public function patient()
    {
        // belongsTo table Patients karena sebagai penyambung dari foreign key RecordDetails
        return $this->belongsTo(Patient::class);
    }
    
    // membuat fungsi record
    public function record()
    {
        // belongsTo table Records karena sebagai penyambung dari foreign key RecordDetails
        return $this->belongsTo(Record::class);
    }
    
    // Fungsi deleteAll bertipe public untuk menghapus seluruh data resource beserta foreign key
    public function deleteAll()
    {
        // Memanggil database metode untuk mengawasi jalannya query pada saat dipanggil
        DB::transaction(function() 
        {
            // Mendelete table Patients dari foreign key yang ada
            $this->patient()->delete();
            // Mendelete table Records dari foreign key yang ada
            $this->record()->delete();
            // Mendelete table RecordDetails
            parent::delete();
        });
    }

    // Fungsi getAll bertipe public static untuk mengambil seluruh data resource beserta foreign key
    public static function getAll()
    {
        // Membuat join table relasi
        return DB::table('record_details')->join('patients', 'record_details.patient_id', '=', 'patients.id')
        ->rightjoin('records', 'record_details.record_id', '=', 'records.id')
        ->select(['patients.*', 'record_details.status', 'records.*'])->get();
    }
    
    // Fungsi getName bertipe public static untuk mengambil seluruh data berdasarkan nama patient beserta foreign key
    public static function getByName($name)
    {
        // Membuat join table relasi
        return DB::table('record_details')->join('patients', 'record_details.patient_id', '=', 'patients.id')
        ->rightjoin('records', 'record_details.record_id', '=', 'records.id')
        ->select(['patients.*', 'record_details.status', 'records.*'])->where('patients.name', 'like', $name.'%')->get();
    }

    // Fungsi getByPositive bertipe public static untuk mengambil seluruh data berdasarkan status positive resource beserta foreign key
    public static function getByPositive()
    {
        // Membuat join table relasi
        return DB::table('record_details')->join('patients', 'record_details.patient_id', '=', 'patients.id')
        ->rightjoin('records', 'record_details.record_id', '=', 'records.id')
        ->select(['patients.*', 'record_details.status', 'records.*'])->where('record_details.status', 'like', 'positive')->get();
    }

    // Fungsi getByRecovered bertipe public static untuk mengambil seluruh data berdasarkan status recovered resource beserta foreign key
    public static function getByRecovered()
    {
        // Membuat join table relasi
        return DB::table('record_details')->join('patients', 'record_details.patient_id', '=', 'patients.id')
        ->rightjoin('records', 'record_details.record_id', '=', 'records.id')
        ->select(['patients.*', 'record_details.status', 'records.*'])->where('record_details.status', 'like', 'recovered')->get();
    }

    // Fungsi getByDead bertipe public static untuk mengambil seluruh data berdasarkan status dead resource beserta foreign key
    public static function getByDead()
    {
        // Membuat join table relasi
        return DB::table('record_details')->join('patients', 'record_details.patient_id', '=', 'patients.id')
        ->rightjoin('records', 'record_details.record_id', '=', 'records.id')
        ->select(['patients.*', 'record_details.status', 'records.*'])->where('record_details.status', 'like', 'dead')->get();
    }

    // Fungsi getById bertipe public static untuk mengambil satu data berdasarkan id resource beserta foreign key
    public function getById($id)
    {
        // Membuat join table relasi
        return $this->join('patients', 'record_details.patient_id', '=', 'patients.id')
        ->rightjoin('records', 'record_details.record_id', '=', 'records.id')
        ->select(['patients.*', 'record_details.status', 'records.*'])->where('record_details.id', $id)->get()->first();
    }
}
