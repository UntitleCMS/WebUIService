import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFeedPageComponent } from './main-feed-page.component';

describe('MainFeedPageComponent', () => {
  let component: MainFeedPageComponent;
  let fixture: ComponentFixture<MainFeedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainFeedPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
