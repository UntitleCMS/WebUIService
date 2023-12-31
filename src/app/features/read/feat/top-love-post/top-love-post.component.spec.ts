import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLovePostComponent } from './top-love-post.component';

describe('TopLovePostComponent', () => {
  let component: TopLovePostComponent;
  let fixture: ComponentFixture<TopLovePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopLovePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopLovePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
