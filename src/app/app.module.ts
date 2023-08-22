import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListaComponent } from './lista/lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module'; // Importa AppRoutingModule
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa MatToolbarModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa MatToolbarModule
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import { ProgramacionSemanalComponent } from './programacion-semanal/programacion-semanal.component'; // Importa RouterModule y la configuración de rutas


@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    ProgramacionSemanalComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule, // Agrega los módulos que necesitas
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatTreeModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule, // Agrega MatToolbarModule
    RouterModule, // Agrega RouterModule
    AppRoutingModule // Agrega AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
