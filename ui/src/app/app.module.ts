import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './components/home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './components/about/about.module';
import { LoginModule } from './components/login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ResponseProfileManagerComponent } from './components/responseprofile-manager/responseprofile-manager.component';
import { RuleManagerComponent } from './components/rule-manager/rule-manager.component';

import { ResponseProfileManagerRoutingModule } from './components/responseprofile-manager/responseprofile-manager-routing.module';
import { RuleManagerRoutingModule } from './components/rule-manager/rule-manager-routing.module';

import { ApiService } from './service/api.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    ResponseProfileManagerRoutingModule,
    RuleManagerRoutingModule,
    LoginModule,
    TableModule,
    DropdownModule,
    NgSelectModule,
    MultiSelectModule,
    TooltipModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [
    AppComponent,
    ResponseProfileManagerComponent,
    RuleManagerComponent,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
