import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPublishPostPageComponent } from './my-publish-post-page.component';

describe('MyPublishPostPageComponent', () => {
  let component: MyPublishPostPageComponent;
  let fixture: ComponentFixture<MyPublishPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPublishPostPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyPublishPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
