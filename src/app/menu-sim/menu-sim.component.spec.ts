import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSimComponent } from './menu-sim.component';

describe('MenuSimComponent', () => {
  let component: MenuSimComponent;
  let fixture: ComponentFixture<MenuSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
