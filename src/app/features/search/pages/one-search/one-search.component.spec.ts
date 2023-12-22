import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSearchComponent } from './one-search.component';

describe('OneSearchComponent', () => {
  let component: OneSearchComponent;
  let fixture: ComponentFixture<OneSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
