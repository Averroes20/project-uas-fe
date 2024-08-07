import { TahunAjaran } from "./tahun-ajaran";

export interface Siswa {
    nisn: string;
    namaLengkap: string;
    tanggalLahir: string;
    alamat: string;
    namaOrtu: string;
    telp: string;
    foto: string;
    status: boolean;
    tahunAjaran: TahunAjaran;
}
