import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreacionMenusComponent } from './creacion-menu/creacion-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppRoutingModule } from './app-routing.module'; // Importa AppRoutingModule
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa MatToolbarModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa MatToolbarModule
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MatTreeModule } from '@angular/material/tree';
import { ProgramacionSemanalComponent } from './programacion-semanal/programacion-semanal.component';
import { AppBooterComponent } from './app-booter/app-booter.component';
import { GestionListaCompraComponent } from './gestion-lista-compra/gestion-lista-compra.component';
import { GestionProgramacionSemanalComponent } from './gestion-programacion-semanal/gestion-programacion-semanal.component';
import { InputChipsComponent } from './components/input-chips/input-chips.component'; // Importa RouterModule y la configuración de rutas

@NgModule({
  declarations: [
    AppComponent,
    CreacionMenusComponent,
    ProgramacionSemanalComponent,
    AppBooterComponent,
    GestionListaCompraComponent,
    GestionProgramacionSemanalComponent,
    InputChipsComponent
  ],
  imports: [CommonModule,
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
    AppRoutingModule, // Agrega AppRoutingModule
    // paar el chips
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
