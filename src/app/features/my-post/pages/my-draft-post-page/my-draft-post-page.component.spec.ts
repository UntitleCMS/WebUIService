import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDraftPostPageComponent } from './my-draft-post-page.component';

describe('MyDraftPostPageComponent', () => {
  let component: MyDraftPostPageComponent;
  let fixture: ComponentFixture<MyDraftPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDraftPostPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyDraftPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
