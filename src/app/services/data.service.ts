import { Injectable } from '@angular/core';
import { DiaMenu } from '../modelo/modelos';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  listaMenus: DiaMenu[] = [];
  programacionSemanalEditable: DiaMenu[] = [];
  tituloPopup: string = '';
  contenidoPopup: string = '';

  agregarObjeto(objeto: any) {
    this.listaMenus.push(objeto);
  }

  obtenerListaObjetos() {
    return this.listaMenus;
  }

  setListaMenus(menus :  DiaMenu[]) {
    this.listaMenus = menus;
  }
}
