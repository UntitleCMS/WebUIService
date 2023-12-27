import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeBlockSkeletonComponent } from './large-block-skeleton.component';

describe('LargeBlockSkeletonComponent', () => {
  let component: LargeBlockSkeletonComponent;
  let fixture: ComponentFixture<LargeBlockSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargeBlockSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LargeBlockSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
