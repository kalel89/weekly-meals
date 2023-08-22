import { Component, OnInit } from '@angular/core';
import { DiaMenu, Ingrediente, IngredienteEnListCompra, ListaCompra, ProgramacionSemanal } from '../modelo/modelos';
import { DataService } from '../services/data.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { zip } from 'rxjs/internal/observable/zip';

  /***-----------------------------*/

  interface FoodNode {
    name: string;
    menu?: DiaMenu;
    children?: FoodNode[];
  }
  
  
  /** Flat node with expandable and level information */
  interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
    menu?: DiaMenu;
  }
  
  /** ----------------------------------------*/

@Component({
  selector: 'app-programacion-semanal',
  templateUrl: './programacion-semanal.component.html',
  styleUrls: ['./programacion-semanal.component.scss']
})
export class ProgramacionSemanalComponent implements OnInit {
  listaMenus: DiaMenu[] = [];
  listaFiltrada: DiaMenu[] = [];
  
  listaCompra: ListaCompra = { fechaCreacion: '', fechaModificación : '',
  ingredientes: new Map<string, IngredienteEnListCompra>(), nombre:'' };
  
  listaFiltradaCompras?: IngredienteEnListCompra[];

  programacionSemanal: ProgramacionSemanal[] = [];
  
//----------------------------------------------
private _transformer = (node: FoodNode, level: number) => {
  return {
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level: level,
    menu: node.menu || undefined,
  } as ExampleFlatNode ;
};

treeControl = new FlatTreeControl<ExampleFlatNode>(
  node => node.level,
  node => node.expandable,
);

treeFlattener = new MatTreeFlattener(
  this._transformer,
  node => node.level,
  node => node.expandable,
  node => node.children,
);

dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

//----------------------------------------------

  constructor(public dialog: MatDialog, private  service: DataService) {   
    this.dataSource.data = [];
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  buscarTexto: string = '';
  
  ngOnInit(): void {
    this.listaMenus = this.service.listaMenus;
    this.listaFiltrada = this.listaMenus;
  }

  filtrarMenus(event: any) {
    const valorInput = event.target.value;

    if (valorInput.length >= 1) {
      this.listaFiltrada = this.listaMenus
      .filter((x)=> 
        x.nombre_dia_menu.toLowerCase().indexOf(valorInput.toLowerCase())>=0);
    } else {
      this.listaFiltrada = this.listaMenus;
    }
  }
  
  openDialog() {
    this.service.tituloPopup = 'Detalle de ingrediente';
    this.service.contenidoPopup = 'blablablababl <br />';
    this.dialog.open(DialogElementsExampleDialog);

  }

  agregarAListaCompras(m: DiaMenu) {

    const dia = (prompt("Ingrese el dia de la semana:") || 'diaX').toUpperCase();
    
    let p = this.programacionSemanal.find((x)=> x.dia == dia);
    let ps = (p) ? p : { dia: dia.toUpperCase(), etiquetas:[] , menus: []}

    ps.menus.push(JSON.parse(JSON.stringify(m)));

    if(!p) this.programacionSemanal.push(ps);

    this.refrescarVistaProgramacionSemanal();
    this.refrescarVistaListaCompras();
  }

  refrescarVistaListaCompras() {
    this.listaCompra= { fechaCreacion: '', fechaModificación : '',
    ingredientes: new Map<string, IngredienteEnListCompra>(), nombre:'' };

    this.programacionSemanal.forEach((p) => {
      p.menus.forEach((m)=> {
        m.comidas.forEach((comida)=> {
          comida.ingredientes.forEach((ingre)=> {
            let id = ingre.ingrediente + '_' + ingre.unidad;
            if (this.listaCompra.ingredientes.has(id)) {
              let ingredienteInterno = { cantidadTotal: 0, etiquetas:[""],listaMenus: new Set<string>()};
              ingredienteInterno = this.listaCompra.ingredientes.get(id) || ingredienteInterno;
              ingredienteInterno.cantidadTotal = ingredienteInterno.cantidadTotal + ingre.cantidad;
              ingredienteInterno.listaMenus.add(comida.nombre_comida + '  del menu: ' + m.nombre_dia_menu);
            } else {
              this.listaCompra.ingredientes.set(id,
                { nombre: ingre.ingrediente,
                  unidad: ingre.unidad,
                  cantidadTotal: ingre.cantidad,
                  etiquetas:[""],
                  listaMenus:new Set<string>()});
                  this.listaCompra.ingredientes.get(id)?.listaMenus.add(comida.nombre_comida + '  del menu: ' + m.nombre_dia_menu);              
            }
          })      
        })
      });
    });     

    this.listaFiltradaCompras =  Array.from(this.listaCompra.ingredientes.values());
  }

  verMenusDelIngrediente(ingrediente: IngredienteEnListCompra) {
    let inicio = '<body><h1>Menus para el ingrediente: ' + ingrediente.nombre + '</h1> <ul>';    
    let fin = ' </ul> </body>';  

    let contendio = '';
    ingrediente.listaMenus.forEach((b) =>
    { 
        contendio = contendio + '<li>' + b + '</li>';
    })
    
    this.dialog.open(DialogElementsExampleDialog);
    this.service.contenidoPopup = inicio + contendio + fin;
  }
  
  verDetalleDeMenus(menu: DiaMenu) {
    let inicio = '<body><h1>Detalle del Menu: ' + menu.nombre_dia_menu + '</h1> <ul>';    
    let fin = ' </ul> </body>';

    let contendio = '';
    menu.comidas.forEach((comida) =>
    {
      contendio = contendio + '<li><h2>' + comida.nombre_comida + '</h2><ul>';
      comida.ingredientes.forEach((ingred: Ingrediente) => {        
        contendio = contendio + '<li>' + ingred.ingrediente + ' Cantidad: ' + ingred.cantidad + ' de ' + ingred.unidad  + '</li>';
      })
      contendio = contendio + '</ul></li>';
    })
    
    this.dialog.open(DialogElementsExampleDialog);
    this.service.contenidoPopup = inicio + contendio + fin;
  }

  eliminarDeProgramacionSemanal(node: FoodNode) {
    console.warn(node);
    debugger;
    if(!node.menu) {
      this.programacionSemanal = this.programacionSemanal.filter((p) => p.dia != node.name);
    } else {
      this.programacionSemanal = this.programacionSemanal.map((p) => {
        return {dia:p.dia, etiquetas: p.etiquetas, menus: p.menus.filter(c=> !(c === node.menu))}
      });
    }
    this.refrescarVistaProgramacionSemanal();
    this.refrescarVistaListaCompras();
  }
  
  refrescarVistaProgramacionSemanal() {
    let as: FoodNode[] = [];
    this.programacionSemanal.forEach((x) => {
      as.push({name: x.dia, children: x.menus.map(z => {return {name:z.nombre_dia_menu, menu: z}})})
    })
    this.dataSource.data = as;
    this.treeControl.expandAll();
  }
  
}


@Component({
  selector: 'dialog-elements-example-dialog',
  template: '<div [innerHTML]="htmlContent"></div>',
})
export class DialogElementsExampleDialog implements OnInit  {

  title: string = '';
  content: string = '';
  htmlContent: string = '';

  constructor(private services: DataService) {

  }

  ngOnInit(): void {
    this.title = this.services.tituloPopup;
    this.htmlContent = this.services.contenidoPopup;
  }
}

