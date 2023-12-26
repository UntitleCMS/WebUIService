import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveButtonComponent } from './love-button.component';

describe('LoveButtonComponent', () => {
  let component: LoveButtonComponent;
  let fixture: ComponentFixture<LoveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoveButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
