import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionSemanalComponent } from './programacion-semanal.component';

describe('ProgramacionSemanalComponent', () => {
  let component: ProgramacionSemanalComponent;
  let fixture: ComponentFixture<ProgramacionSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramacionSemanalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
