import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ResponseProfileManageComponent } from './responseprofile-manage.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'manage-responseprofile',
      component: ResponseProfileManageComponent,
      data: { title: extract('Manage Response Profiles') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ResponseProfileManageRoutingModule {}
