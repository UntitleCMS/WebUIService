import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccountButtonComponent } from './mobile-account-button.component';

describe('MobileAccountButtonComponent', () => {
  let component: MobileAccountButtonComponent;
  let fixture: ComponentFixture<MobileAccountButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAccountButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileAccountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
