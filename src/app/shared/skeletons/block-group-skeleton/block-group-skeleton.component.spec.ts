import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockGroupSkeletonComponent } from './block-group-skeleton.component';

describe('BlockGroupSkeletonComponent', () => {
  let component: BlockGroupSkeletonComponent;
  let fixture: ComponentFixture<BlockGroupSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockGroupSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlockGroupSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
