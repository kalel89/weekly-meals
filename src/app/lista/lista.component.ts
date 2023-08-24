import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Comida, DiaMenu, Ingrediente } from '../modelo/modelos';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit, AfterViewInit{
  
  constructor(private  service: DataService) {
    
  }
  buscarTexto: string = '';
  formActivo: string = 'X';
  isNewRegistry: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  listaMenus: DiaMenu[] = [];
  listaFiltrada: DiaMenu[] = [];

  nuevoIngrediente: Ingrediente = {
    ingrediente: '',
    cantidad: 0,
    unidad: '',
    tipo_preparacion: '',
  };

  comidaSeleccionada: Comida = {
    nombre_comida: '',
    ingredientes: [],
  };

  diaSeleccionada: DiaMenu = {
    comidas:[],
    nombre_dia_menu: ''
  };

  ngOnInit(): void {
    this.setComodaSeleccionada();
    this.setDiaSeleccionado();
    this.setIngredienteSeleccionado();
    this.listaMenus = this.service.listaMenus;
    this.listaFiltrada = this.listaMenus;
    this.buscarTexto = '';
    this.formActivo = 'X';
    this.isNewRegistry = false;
  }

  ngAfterViewInit() {

    
    if (!this.listaMenus || this.listaMenus.length == 0) {
      // Establecer la ruta de inicio predefinida para el explorador de archivos
      //this.fileInput.nativeElement.setAttribute('webkitdirectory', '');
      this.abrirExplorador();
    }
    
  }

  filtrarMenus(event: any) {
    const valorInput = event.target.value;

    if (valorInput.length >= 1) {
      debugger;
      this.listaFiltrada = this.listaMenus
      .filter((x)=> 
        x.nombre_dia_menu.toLowerCase().indexOf(valorInput.toLowerCase())>=0);
    } else {
      this.listaFiltrada = this.listaMenus;
    }
  } 

  seleccionarComida(comida?: Comida) {
    this.formActivo = 'C';
    this.isNewRegistry = !comida;
    this.setComodaSeleccionada(comida);
  }

  setComodaSeleccionada(comida?: Comida) {
    this.comidaSeleccionada = comida || {
      nombre_comida: '',
      ingredientes: [],
    };
  }

  seleccionarDia(dia?: DiaMenu) {
    this.formActivo = 'D';
    this.isNewRegistry = !dia;
    this.setDiaSeleccionado(dia);
  }

  setDiaSeleccionado(dia?: DiaMenu) {
    this.diaSeleccionada = dia || {
      nombre_dia_menu: '',
      comidas: [],
    };
  }
  
  seleccionarIngrediente(ingrediente?: Ingrediente) {
    this.formActivo = 'I';
    this.isNewRegistry = !ingrediente;
    this.setIngredienteSeleccionado(ingrediente);
  }

  setIngredienteSeleccionado(ingrediente?: Ingrediente) {
    this.nuevoIngrediente = ingrediente || {
      ingrediente: '',
      cantidad: 0,
      unidad: '',
      tipo_preparacion: '',
    };
  }

  agregarIngrediente(comida: Comida) {
    const copiaObjeto = JSON.parse(JSON.stringify(this.nuevoIngrediente));
    comida.ingredientes.push(copiaObjeto);
    this.setIngredienteSeleccionado();
  }

  registrarNuevaComida() {    
    const copiaObjeto = JSON.parse(JSON.stringify(this.comidaSeleccionada));
    this.diaSeleccionada.comidas.push(copiaObjeto);        
    this.setComodaSeleccionada();
  }

  registrarNuevoDia() {    
    const copiaObjeto = JSON.parse(JSON.stringify(this.diaSeleccionada));
    this.listaMenus.push(copiaObjeto);
    this.setDiaSeleccionado();
  }

  eliminarComida(s:any){

  }

  eliminarIngrediente(s:any){

  }

  nuevoMenuDeDia(){
    this.diaSeleccionada = {
      nombre_dia_menu: '',
      comidas: [],
    };
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
        this.listaMenus = contenidoJSON;
        this.listaFiltrada = this.listaMenus;
        this.service.setListaMenus(this.listaMenus);
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

    const contenidoTexto = JSON.stringify(this.listaMenus, null, 2);
    const blob = new Blob([contenidoTexto], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download =  name;
    enlace.click();

    // Liberar el objeto URL
    URL.revokeObjectURL(url);
  }

  cerrarFormulario() {    
    this.formActivo = 'X';
    this.setDiaSeleccionado();
    this.setComodaSeleccionada();
    this.setIngredienteSeleccionado();
  }
}
