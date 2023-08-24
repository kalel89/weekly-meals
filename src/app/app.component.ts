import { Component, HostListener, ViewChild, ElementRef, } from '@angular/core';
import { DataService } from '../app/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mi-lista-app';
  sidebarOpen = false;

  constructor(private  service: DataService) {  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    // Mostrar el mensaje de confirmación
    $event.returnValue = '¿Estás seguro que deseas abandonar la página?';
  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  abrirExplorador() {
    this.fileInput.nativeElement.click();
  }
  cargarArchivo(event: Event) {
    const archivoSeleccionado = (event.target as HTMLInputElement).files?.[0];
    if (archivoSeleccionado) {
      this.leerContenidoArchivo(archivoSeleccionado);
    }
  }

  leerContenidoArchivo(archivo: File) {
    const lector = new FileReader();
    lector.onload = (e) => {
      const contenido = e.target?.result as string;
      try {
        const contenidoJSON = JSON.parse(contenido);
        this.service.setListaMenus(contenidoJSON);
        console.log(contenidoJSON);
      } catch (error) {
        console.error('El archivo no es válido JSON.', error);
      }
    };
    lector.readAsText(archivo);
  }

  guardarEnArchivo() {
    var name = prompt("Ingresa el nombre del archivo : ", "El nombre del archivo aqui");
    if (!name) {
      name = 'menu_default.json'
    }

    const contenidoTexto = JSON.stringify(this.service.listaMenus, null, 2);
    const blob = new Blob([contenidoTexto], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download =  name;
    enlace.click();

    // Liberar el objeto URL
    URL.revokeObjectURL(url);
  }
}
