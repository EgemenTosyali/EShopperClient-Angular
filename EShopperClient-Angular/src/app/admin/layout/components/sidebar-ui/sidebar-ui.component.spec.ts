import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarUiComponent } from './sidebar-ui.component';

describe('SidebarUiComponent', () => {
  let component: SidebarUiComponent;
  let fixture: ComponentFixture<SidebarUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});