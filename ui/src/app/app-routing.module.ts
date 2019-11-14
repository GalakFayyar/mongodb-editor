import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponseProfileManageComponent } from './components/responseprofile-manage/responseprofile-manage.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
  { path: '', pathMatch: 'full', redirectTo: 'manage-responseprofile' },
  { path: 'manage-responseprofile', component: ResponseProfileManageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
