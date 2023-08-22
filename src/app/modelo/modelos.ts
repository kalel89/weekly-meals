//Lista de menu INI
export interface Ingrediente {
    ingrediente: string;
    unidad: string;
    tipo_preparacion: string;
    cantidad: number
  }
  
  export interface Comida {
    nombre_comida: string;
    ingredientes: Ingrediente[];
  }
  
  export interface DiaMenu {
    nombre_dia_menu: string;
    comidas: Comida[];
  }
//Lista de menu FIN

//Lista de compras INI
export interface ListaCompra {
    ingredientes: Map<string, IngredienteEnListCompra>;
    nombre: string;
    fechaCreacion: string;
    fechaModificación: string;
  }

  export interface IngredienteEnListCompra {
    nombre: string,
    unidad: string,
    cantidadTotal: number
    listaMenus: Set<string>,
    etiquetas: string[] //donde comprar
  }
  //Lista de compras FIN

//Lista de programacion semanal INI
export interface ProgramacionSemanal {
    dia: string,
    menus: DiaMenu[],    
    etiquetas: string[] //donde comprar
  }
  
//Lista de menu FIN