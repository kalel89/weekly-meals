import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionMenusComponent } from './creacion-menu.component';

describe('ListaComponent', () => {
  let component: CreacionMenusComponent;
  let fixture: ComponentFixture<CreacionMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
