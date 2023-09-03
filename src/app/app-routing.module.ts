import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppBooterComponent } from './app-booter/app-booter.component';

import { CreacionMenusComponent } from './creacion-menu/creacion-menu.component';
import { ProgramacionSemanalComponent } from './programacion-semanal/programacion-semanal.component';
//import { Componente2Component } from './componente2/componente2.component';
//import { Componente3Component } from './componente3/componente3.component';

const routes: Routes = [
  { path: 'inicio', component: AppBooterComponent },
  { path: 'creacion', component: CreacionMenusComponent },
  { path: 'programacion-semanal', component: ProgramacionSemanalComponent },
  { path: 'historial', component: CreacionMenusComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
