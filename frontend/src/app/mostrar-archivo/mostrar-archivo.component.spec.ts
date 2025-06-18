import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarArchivoComponent } from './mostrar-archivo.component';

describe('MostrarArchivoComponent', () => {
  let component: MostrarArchivoComponent;
  let fixture: ComponentFixture<MostrarArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarArchivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
