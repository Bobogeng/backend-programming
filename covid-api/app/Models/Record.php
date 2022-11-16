<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;

    // Mendaftarkan atribut (nama kolom) yang bisa kita isi ketika melakukan insert atau update ke database.
    protected $fillable = [
        'in_date_at',
        'out_date_at',
    ];
    
    // membuat fungsi recordDetail
    public function recordDetail()
    {
        // hasOne table RecordDetails karena sebagai parent key dan mempunyai banyak RecordDetails
        return $this->hasOne(RecordDetail::class);
    }
}
