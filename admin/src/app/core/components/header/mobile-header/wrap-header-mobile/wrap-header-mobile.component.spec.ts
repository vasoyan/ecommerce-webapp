import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapHeaderMobileComponent } from './wrap-header-mobile.component';

describe('WrapHeaderMobileComponent', () => {
  let component: WrapHeaderMobileComponent;
  let fixture: ComponentFixture<WrapHeaderMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrapHeaderMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WrapHeaderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
