import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTagComponent } from './top-tag.component';

describe('TopTagComponent', () => {
  let component: TopTagComponent;
  let fixture: ComponentFixture<TopTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
