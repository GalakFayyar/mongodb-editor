import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponseProfileManagerComponent } from './components/responseprofile-manager/responseprofile-manager.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
  // { path: '', pathMatch: 'full', redirectTo: '/manage-responseprofile' },
  // { path: 'manage-responseprofile', component: ResponseProfileManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
