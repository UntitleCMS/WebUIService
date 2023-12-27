import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OneSearchComponent } from './pages/one-search/one-search.component';

const routes: Routes = [
  {
    path: '',
    component: OneSearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
