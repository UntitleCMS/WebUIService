import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUseTagComponent } from './top-use-tag.component';

describe('TopUseTagComponent', () => {
  let component: TopUseTagComponent;
  let fixture: ComponentFixture<TopUseTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopUseTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopUseTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
