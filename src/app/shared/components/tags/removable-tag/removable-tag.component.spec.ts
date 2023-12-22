import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovableTagComponent } from './removable-tag.component';

describe('RemovableTagComponent', () => {
  let component: RemovableTagComponent;
  let fixture: ComponentFixture<RemovableTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemovableTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemovableTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
