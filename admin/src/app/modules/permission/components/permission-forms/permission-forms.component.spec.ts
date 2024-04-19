import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionFormsComponent } from './permission-forms.component';

describe('PermissionFormsComponent', () => {
  let component: PermissionFormsComponent;
  let fixture: ComponentFixture<PermissionFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
