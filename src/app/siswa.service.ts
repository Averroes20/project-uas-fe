import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Siswa } from './siswa';
import { TahunAjaran } from './tahun-ajaran';
import { ApiResponse } from './api-response'; // Import ApiResponse interface
import { UpdateSiswa } from './update-siswa';

@Injectable({
  providedIn: 'root'
})
export class SiswaService {
  private baseUrl = environment.apiUrl + '/mahasiswa';

  constructor(private http: HttpClient) { }

  getSiswa(params: {
    pageSize?: number,
    pageNumber?: number,
    sortBy?: string,
    sortOrder?: string,
    siswaId?: number,
    nisn?: string,
    nama_lengkap?: string,
    tanggal_ahir?: Date,
    alamat?: string;
    nama_ortu?: string;
    telp?: string;
    foto?: string;
    status?: boolean;
    tahunAjaran?: TahunAjaran;
  }): Observable<ApiResponse<Siswa[]>> { // Use ApiResponse<Siswa[]> as the return type
    const url = this.baseUrl;
    let query = '';
    for (const key in params) {
      if (
        params[key as keyof typeof params] !== undefined &&
        params[key as keyof typeof params] !== null
      ) {
        if (query !== '') {
          query += '&';
        }
        query += `${key}=${params[key as keyof typeof params]}`;
      }
    }
    return this.http.get<ApiResponse<Siswa[]>>(`${url}?${query}`);
  }

  addSiswa(siswa: Siswa): Observable<Siswa> {
    return this.http.post<Siswa>(`${this.baseUrl}/${'create'}`, siswa);
  }

  editSiswa(siswa: UpdateSiswa, id: number): Observable<Siswa> {
    return this.http.patch<UpdateSiswa>(`${this.baseUrl}/${id}`, siswa);
  }

  deleteSiswa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
