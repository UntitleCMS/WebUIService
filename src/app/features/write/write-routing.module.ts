import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostPageComponent } from './pages/add-post-page/add-post-page.component';
import { EditPostPageComponent } from './pages/edit-post-page/edit-post-page.component';

const routes: Routes = [
  {
    path: '',
    component: AddPostPageComponent,
    canDeactivate: [
      (componet: AddPostPageComponent) => componet.canDeactivate(),
    ],
  },
  {
    path: ':postId/edit',
    component: EditPostPageComponent,
    canDeactivate: [
      (componet: EditPostPageComponent) => componet.canDeactivate(),
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteRoutingModule { }
