import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ResponseProfileCreateComponent } from './responseprofile-create.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'create-responseprofile',
      component: ResponseProfileCreateComponent,
      data: { title: extract('Create') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ResponseProfileCreateRoutingModule {}
