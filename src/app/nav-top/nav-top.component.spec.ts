import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTopComponent } from './nav-top.component';

describe('NavTopComponent', () => {
  let component: NavTopComponent;
  let fixture: ComponentFixture<NavTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
