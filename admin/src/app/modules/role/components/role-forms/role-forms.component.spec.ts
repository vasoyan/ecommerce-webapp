import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleFormsComponent } from './role-forms.component';

describe('RoleFormsComponent', () => {
  let component: RoleFormsComponent;
  let fixture: ComponentFixture<RoleFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
