import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Comida, DiaMenu, Ingrediente } from '../modelo/modelos';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-creacion-menu',
  templateUrl: './creacion-menu.component.html',
  styleUrls: ['./creacion-menu.component.css']
})
export class CreacionMenusComponent implements OnInit, AfterViewInit{
  
  constructor(private  service: DataService) {  }
  buscarTexto: string = '';
  formActivo: string = 'X';
  isNewRegistry: boolean = false;

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
    this.listaMenus = this.service.listaMenus;
    this.listaFiltrada = this.listaMenus;
  }

  ngAfterViewInit() {

    
    //if (!this.listaMenus || this.listaMenus.length == 0) {
      // Establecer la ruta de inicio predefinida para el explorador de archivos
      //this.fileInput.nativeElement.setAttribute('webkitdirectory', '');
    //  this.abrirExplorador();
    //}
    
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

  cerrarFormulario() {    
    this.formActivo = 'X';
    this.setDiaSeleccionado();
    this.setComodaSeleccionada();
    this.setIngredienteSeleccionado();
  }
}
