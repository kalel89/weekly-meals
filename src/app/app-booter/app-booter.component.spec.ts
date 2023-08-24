import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBooterComponent } from './app-booter.component';

describe('AppBooterComponent', () => {
  let component: AppBooterComponent;
  let fixture: ComponentFixture<AppBooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
