import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMyProfilePageComponent } from './settings-my-profile-page.component';

describe('SettingsMyProfilePageComponent', () => {
  let component: SettingsMyProfilePageComponent;
  let fixture: ComponentFixture<SettingsMyProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsMyProfilePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsMyProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
