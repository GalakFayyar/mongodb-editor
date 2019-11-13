import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponseProfileCreateComponent } from './components/responseprofile-create/responseprofile-create.component';
import { ResponseProfileListComponent } from './components/responseprofile-list/responseprofile-list.component';
import { ResponseProfileEditComponent } from './components/responseprofile-edit/responseprofile-edit.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
  { path: '', pathMatch: 'full', redirectTo: 'create-responseprofile' },
  { path: 'create-responseprofile', component: ResponseProfileCreateComponent },
  { path: 'edit-responseprofile/:id', component: ResponseProfileEditComponent },
  { path: 'responseprofile-list', component: ResponseProfileListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
