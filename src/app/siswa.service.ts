import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Siswa } from './siswa';

@Injectable({
  providedIn: 'root'
})
export class SiswaService {
  private apiUrl = 'http://localhost:8080/api/mahasiswa';

  constructor(private http: HttpClient) { }

  getSiswa(pageSize: number, pageNumber: number, sortBy: string): Observable<any> {
    const url = `${this.apiUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortBy}`;
    return this.http.get<any>(url);
  }

  createSiswa(siswaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, siswaData);
  }

  updateSiswa(siswaId: number, updatedSiswa: Siswa): Observable<any> {
    const updateUrl = `${this.apiUrl}/update/${siswaId}`;
    return this.http.put(updateUrl, updatedSiswa);
  }

  deleteSiswa(siswaId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${siswaId}`);
  }
}
