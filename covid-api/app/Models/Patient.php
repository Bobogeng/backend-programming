<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;
    
    // Mendaftarkan atribut (nama kolom) yang bisa kita isi ketika melakukan insert atau update ke database.
    protected $fillable = [
        'name',
        'phone',
        'address',
    ];
    
    // membuat fungsi recordDetails
    public function recordDetails()
    {
        // hasMany table RecordDetails karena sebagai parent key dan mempunyai banyak RecordDetails
        return $this->hasMany(RecordDetail::class);
    }
}
