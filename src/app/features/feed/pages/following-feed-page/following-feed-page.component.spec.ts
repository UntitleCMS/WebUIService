import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingFeedPageComponent } from './following-feed-page.component';

describe('FollowingFeedPageComponent', () => {
  let component: FollowingFeedPageComponent;
  let fixture: ComponentFixture<FollowingFeedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowingFeedPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowingFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
