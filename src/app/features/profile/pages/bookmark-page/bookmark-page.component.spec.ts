import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkPageComponent } from './bookmark-page.component';

describe('BookmarkPageComponent', () => {
  let component: BookmarkPageComponent;
  let fixture: ComponentFixture<BookmarkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookmarkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
