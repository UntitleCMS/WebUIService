import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendPageComponent } from './trend-page.component';

describe('TrendPageComponent', () => {
  let component: TrendPageComponent;
  let fixture: ComponentFixture<TrendPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrendPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
