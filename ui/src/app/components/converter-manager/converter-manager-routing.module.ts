import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ConverterManagerComponent } from './converter-manager.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'converters-manager',
      component: ConverterManagerComponent,
      data: { title: extract('Manage Converters') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ConverterManagerRoutingModule {}
