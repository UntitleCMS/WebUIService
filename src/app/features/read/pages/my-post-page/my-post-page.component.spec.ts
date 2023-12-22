import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostPageComponent } from './my-post-page.component';

describe('MyPostPageComponent', () => {
  let component: MyPostPageComponent;
  let fixture: ComponentFixture<MyPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPostPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
