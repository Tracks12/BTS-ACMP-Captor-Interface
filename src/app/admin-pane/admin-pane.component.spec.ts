import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaneComponent } from './admin-pane.component';

describe('AdminPaneComponent', () => {
  let component: AdminPaneComponent;
  let fixture: ComponentFixture<AdminPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
