import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesConsumidoraComponent } from './unidades-consumidora.component';

describe('UnidadesConsumidoraComponent', () => {
  let component: UnidadesConsumidoraComponent;
  let fixture: ComponentFixture<UnidadesConsumidoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesConsumidoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesConsumidoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
