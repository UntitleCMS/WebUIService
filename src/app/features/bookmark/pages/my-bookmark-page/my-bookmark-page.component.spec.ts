import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookmarkPageComponent } from './my-bookmark-page.component';

describe('MyBookmarkPageComponent', () => {
  let component: MyBookmarkPageComponent;
  let fixture: ComponentFixture<MyBookmarkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBookmarkPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyBookmarkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
