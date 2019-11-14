import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TableModule } from 'primeng/table';
import { NgSelectModule } from '@ng-select/ng-select';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './components/home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './components/about/about.module';
import { LoginModule } from './components/login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ResponseProfileManageComponent } from './components/responseprofile-manage/responseprofile-manage.component';

import { ResponseProfileManageRoutingModule } from './components/responseprofile-manage/responseprofile-manage-routing.module';

import { ApiService } from './service/api.service';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    LoginModule,
    ResponseProfileManageRoutingModule,
    TableModule,
    NgSelectModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [
    AppComponent,
    ResponseProfileManageComponent,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
