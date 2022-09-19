import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionOffreOperateurComponent } from './gestion-offre-operateur.component';

describe('GestionOffreOperateurComponent', () => {
  let component: GestionOffreOperateurComponent;
  let fixture: ComponentFixture<GestionOffreOperateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionOffreOperateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionOffreOperateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
