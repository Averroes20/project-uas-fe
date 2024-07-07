import { TahunAjaran } from "./tahun-ajaran";

export interface Siswa {
    siswaId: number;
    nisn: string;
    namaLengkap: string;
    tanggalLahir: Date;
    alamat: string;
    namaOrtu: string;
    telp: string;
    foto: string;
    status: boolean;
    tahunAjaran: TahunAjaran;
}
