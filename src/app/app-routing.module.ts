import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiswaComponent } from './siswa/siswa.component';

const routes: Routes = [
  { path: '', redirectTo: 'mahasiswa', pathMatch: 'full' },
  { path: 'mahasiswa', component: SiswaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
