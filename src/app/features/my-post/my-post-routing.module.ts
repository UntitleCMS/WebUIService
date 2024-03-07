import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPublishPostPageComponent } from './pages/my-publish-post-page/my-publish-post-page.component';
import { MyDraftPostPageComponent } from './pages/my-draft-post-page/my-draft-post-page.component';
import { MyPostLayoutComponent } from './layouts/my-post-layout/my-post-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MyPostLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'published',
        pathMatch: 'full',
      },
      {
        path: 'published',
        component: MyPublishPostPageComponent,
      },
      {
        path: 'draft',
        component: MyDraftPostPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPostRoutingModule {}
