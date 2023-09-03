import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionListaCompraComponent } from './gestion-lista-compra.component';

describe('GestionListaCompraComponent', () => {
  let component: GestionListaCompraComponent;
  let fixture: ComponentFixture<GestionListaCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionListaCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionListaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
