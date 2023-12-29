import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';
import { SettingsMyProfilePageComponent } from './pages/settings-my-profile-page/settings-my-profile-page.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'me',
    component: MyProfilePageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'me/settings',
    component: SettingsMyProfilePageComponent,
    canActivate: [authGuard]
  },
  {
    path: ':userId',
    component: ProfilePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
