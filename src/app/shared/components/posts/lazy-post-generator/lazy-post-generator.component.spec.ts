import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyPostGeneratorComponent } from './lazy-post-generator.component';

describe('LazyPostGeneratorComponent', () => {
  let component: LazyPostGeneratorComponent;
  let fixture: ComponentFixture<LazyPostGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyPostGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LazyPostGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
