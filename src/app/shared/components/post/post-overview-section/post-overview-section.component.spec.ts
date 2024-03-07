import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOverviewSectionComponent } from './post-overview-section.component';

describe('PostOverviewSectionComponent', () => {
  let component: PostOverviewSectionComponent;
  let fixture: ComponentFixture<PostOverviewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostOverviewSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostOverviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
