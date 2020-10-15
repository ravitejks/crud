import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizeComponent } from './components/visualize/visualize.component';

const routes: Routes = [
  {path: '', component: VisualizeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizeRoutingModule { }
