import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { ProgramacionSemanalComponent } from './programacion-semanal/programacion-semanal.component';
//import { Componente2Component } from './componente2/componente2.component';
//import { Componente3Component } from './componente3/componente3.component';

const routes: Routes = [
  { path: 'creacion', component: ListaComponent },
  { path: 'programacion-semanal', component: ProgramacionSemanalComponent },
  { path: 'historial', component: ListaComponent },
  { path: '', redirectTo: '/creacion', pathMatch: 'full' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
