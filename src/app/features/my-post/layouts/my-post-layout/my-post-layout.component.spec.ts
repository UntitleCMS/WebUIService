import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostLayoutComponent } from './my-post-layout.component';

describe('MyPostLayoutComponent', () => {
  let component: MyPostLayoutComponent;
  let fixture: ComponentFixture<MyPostLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPostLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyPostLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
