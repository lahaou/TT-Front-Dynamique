import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeurFtpComponent } from './serveur-ftp.component';

describe('ServeurFtpComponent', () => {
  let component: ServeurFtpComponent;
  let fixture: ComponentFixture<ServeurFtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServeurFtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeurFtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
