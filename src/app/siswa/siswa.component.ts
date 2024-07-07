import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { ApiResponse } from '../api-response';
import { Siswa } from '../siswa';
import { SiswaService } from '../siswa.service';
import { TahunAjaran } from '../tahun-ajaran';
import { UpdateSiswa } from '../update-siswa';

@Component({
  selector: 'app-siswa',
  templateUrl: './siswa.component.html',
  styleUrls: ['./siswa.component.css']
})
export class SiswaComponent implements OnInit {
  siswaForm: FormGroup;
  siswa: Siswa[] = [];
  isEditing = false;
  selectedSiswa: UpdateSiswa = {} as UpdateSiswa;
  pageSize = 10;
  siswaId ?: number;
  pageNumber = 1;
  sortBy = 'namaLengkap';
  sortOrder = 'ASC';
  searchName: string = '';
  filteredSiswa: Siswa[] = [];

  constructor(private siswaService: SiswaService) {
    this.siswaForm = new FormGroup({
      siswaId: new FormControl(),
      nisn: new FormControl(''),
      nama_lengkap: new FormControl(''),
      tanggal_lahir: new FormControl(''),
      alamat: new FormControl(''),
      nama_ortu: new FormControl(''),
      telp: new FormControl(''),
      foto: new FormControl(''),
      status: new FormControl(''),
      tahunAjaran: new FormControl('')
    });
  }

  displayDialog = false;

  ngOnInit() {
    this.getSiswa();
  }

  resetForm() {
    this.siswaForm.reset();
    this.isEditing = false;
  }

  clear(table: Table) {
    table.clear();
  }

  getSiswa() {
    const params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      sortBy: this.sortBy,
      namaLengkap: this.searchName
    };

    this.siswaService.getSiswa(params).subscribe({
      next: (response: ApiResponse<Siswa[]>) => {
        this.siswa = response.data;
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  addSiswa() {
    this.isEditing = false;
    const siswaDto: Siswa = {
      nisn: this.siswaForm.value.nisn ?? '',
      namaLengkap: this.siswaForm.value.nama_lengkap ?? '',
      tanggalLahir: this.siswaForm.value.tanggal_lahir ?? '',
      alamat: this.siswaForm.value.alamat ?? '',
      namaOrtu: this.siswaForm.value.nama_ortu ?? '',
      telp: this.siswaForm.value.telp ?? '',
      foto: this.siswaForm.value.foto ?? '',
      status: this.siswaForm.value.status ?? true,
      tahunAjaran: this.siswaForm.value.tahunAjaran ?? {} as TahunAjaran
    };

    this.siswaService.addSiswa(siswaDto).subscribe({
      next: data => {
        console.log('Data', data);
        this.getSiswa();
        this.displayDialog = false;
        this.siswaForm.reset();
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  editSiswa(siswa: UpdateSiswa) {
    this.isEditing = true;
    this.selectedSiswa = siswa;
    this.siswaForm.setValue({
      nisn: siswa.nisn,
      nama_lengkap: siswa.namaLengkap,
      tanggal_lahir: siswa.tanggalLahir,
      alamat: siswa.alamat,
      nama_ortu: siswa.namaOrtu,
      telp: siswa.telp,
      foto: siswa.foto,
      status: siswa.status,
      tahunAjaran: siswa.tahunAjaran,
    });
    this.displayDialog = true;
  }

  updateSiswa() {
    const updateSiswa: UpdateSiswa = {
      siswaId: this.siswaForm.value.siswaId ?? '',
      nisn: this.siswaForm.value.nisn ?? '',
      namaLengkap: this.siswaForm.value.nama_lengkap ?? '',
      tanggalLahir: this.siswaForm.value.tanggal_lahir ?? '',
      alamat: this.siswaForm.value.alamat ?? '',
      namaOrtu: this.siswaForm.value.nama_ortu ?? '',
      telp: this.siswaForm.value.telp ?? '',
      foto: this.siswaForm.value.foto ?? '',
      status: this.siswaForm.value.status ?? true,
      tahunAjaran: this.siswaForm.value.tahunAjaran ?? {} as TahunAjaran
    };

    const siswaNo = this.selectedSiswa?.siswaId ?? 0;
    this.siswaService.editSiswa(updateSiswa, siswaNo).subscribe({
      next: data => {
        console.log('Data', data);
        this.getSiswa();
        this.displayDialog = false;
        this.siswaForm.reset();
        this.isEditing = false;
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  deleteSiswa(siswaNo: number) {
    if (siswaNo == null) {
      console.error('Siswa ID is null');
      return;
    }

    this.siswaService.deleteSiswa(siswaNo).subscribe({
      next: data => {
        console.log('Data', data);
        this.getSiswa();
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  searchSiswa() {
    this.getSiswa();
  }

  clearSearch() {
    this.searchName = '';
    this.searchSiswa();
  }
}
