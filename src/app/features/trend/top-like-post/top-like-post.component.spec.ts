import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLikePostComponent } from './top-like-post.component';

describe('TopLikePostComponent', () => {
  let component: TopLikePostComponent;
  let fixture: ComponentFixture<TopLikePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopLikePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopLikePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
