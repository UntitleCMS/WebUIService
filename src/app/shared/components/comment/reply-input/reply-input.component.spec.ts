import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyInputComponent } from './reply-input.component';

describe('ReplyInputComponent', () => {
  let component: ReplyInputComponent;
  let fixture: ComponentFixture<ReplyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReplyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
