import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSearchPageComponent } from './main-search-page.component';

describe('MainSearchPageComponent', () => {
  let component: MainSearchPageComponent;
  let fixture: ComponentFixture<MainSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSearchPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
