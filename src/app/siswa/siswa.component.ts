// siswa.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Siswa } from '../siswa';
import { SiswaService } from '../siswa.service';

@Component({
  selector: 'app-siswa',
  templateUrl: './siswa.component.html',
  styleUrls: ['./siswa.component.css']
})
export class SiswaComponent implements OnInit {
  displayedColumns: string[] = ['siswaId', 'nisn', 'nama_lengkap', 'tanggal_lahir', 'alamat', 'nama_ortu', 'telp', 'status', 'actions'];
  dataSource: Siswa[] = [];
  newSiswaForm: FormGroup;
  editingSiswa: Siswa | null = null;

  constructor(private siswaService: SiswaService, private fb: FormBuilder) {
    this.newSiswaForm = this.fb.group({
      taId:['', Validators.required],
      nisn: ['', Validators.required],
      namaLengkap: ['', Validators.required],
      tanggalLahir: ['', Validators.required],
      alamat: ['', Validators.required],
      namaOrtu: ['', Validators.required],
      telp: ['', Validators.required],
      foto: [''],
      status: [true]
    });    
  }

  ngOnInit(): void {
    this.fetchSiswaData(10, 1, 'namaLengkap,asc');
  }

  fetchSiswaData(pageSize: number, pageNumber: number, sortBy: string): void {
    this.siswaService.getSiswa(pageSize, pageNumber, sortBy)
      .subscribe(
        response => {
          this.dataSource = response.data.map((item: any) => ({
            siswaId: item.siswaId,
            nisn: item.nisn,
            namaLengkap: item.nama_lengkap,
            tanggalLahir: new Date(item.tanggal_lahir), // Konversi timestamp ke Date
            alamat: item.alamat,
            namaOrtu: item.nama_ortu,
            telp: item.telp,
            foto: item.foto,
            status: item.status,
            tahunAjaran: {
              taId: item.tahunAjaran.taId,
              periode: item.tahunAjaran.periode,
              tglMulai: new Date(item.tahunAjaran.tglMulai), // Konversi timestamp ke Date
              tglAkhir: new Date(item.tahunAjaran.tglAkhir), // Konversi timestamp ke Date
              kurikulum: item.tahunAjaran.kurikulum
            }
          }));
        },
        error => {
          console.error('Error fetching siswa data:', error);
        }
      );
  }

  editSiswa(siswa: Siswa): void {
    this.editingSiswa = siswa;
  }

  saveEdit(): void {
    if (this.newSiswaForm.valid && this.editingSiswa) {
      const updatedSiswa = {
        ...this.editingSiswa,
        namaLengkap: this.newSiswaForm.get('namaLengkap')?.value,
        tanggalLahir: this.newSiswaForm.get('tanggalLahir')?.value,
        alamat: this.newSiswaForm.get('alamat')?.value,
        namaOrtu: this.newSiswaForm.get('namaOrtu')?.value,
        telp: this.newSiswaForm.get('telp')?.value,
        status: this.newSiswaForm.get('status')?.value
      };
  
      // Lakukan pengiriman data ke service atau backend
      this.siswaService.updateSiswa(updatedSiswa.siswaId, updatedSiswa)
        .subscribe(
          response => {
            console.log('Siswa berhasil diupdate:', response);
            this.fetchSiswaData(10, 1, 'namaLengkap,asc');
            this.cancelEdit();
          },
          error => {
            console.error('Error updating siswa:', error);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }
  
  cancelEdit(): void {
    this.editingSiswa = null;
  }

  tambahSiswa(): void {
    if (this.newSiswaForm.valid) {
      this.siswaService.createSiswa(this.newSiswaForm.value)
        .subscribe(
          response => {
            console.log('Siswa berhasil ditambahkan:', response);
            this.fetchSiswaData(10, 1, 'namaLengkap,asc');
            this.newSiswaForm.reset();
          },
          error => {
            console.error('Error adding siswa:', error);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }

  hapusSiswa(siswaId: number): void {
    this.siswaService.deleteSiswa(siswaId)
      .subscribe(
        response => {
          console.log('Siswa berhasil dihapus:', response);
          this.fetchSiswaData(10, 1, 'namaLengkap,asc');
        },
        error => {
          console.error('Error deleting siswa:', error);
        }
      );
  }
}
