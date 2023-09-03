import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProgramacionSemanalComponent } from './gestion-programacion-semanal.component';

describe('GestionProgramacionSemanalComponent', () => {
  let component: GestionProgramacionSemanalComponent;
  let fixture: ComponentFixture<GestionProgramacionSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionProgramacionSemanalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProgramacionSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
