import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ResponseProfileManagerComponent } from './responseprofile-manager.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'responseprofiles-manager',
      component: ResponseProfileManagerComponent,
      data: { title: extract('Manage Response Profiles') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ResponseProfileManagerRoutingModule {}
