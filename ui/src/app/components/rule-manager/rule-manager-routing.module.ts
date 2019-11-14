import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { RuleManagerComponent } from './rule-manager.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'rules-manager',
      component: RuleManagerComponent,
      data: { title: extract('ManageRules') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RuleManagerRoutingModule {}
