import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NavTopComponent } from './nav-top/nav-top.component';
import { TelemetryComponent } from './telemetry/telemetry.component';
import { AdminPaneComponent } from './admin-pane/admin-pane.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, NavTopComponent, TelemetryComponent, AdminPaneComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
}) export class AppModule { }
