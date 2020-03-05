// Importation des modules pour angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

// Importations des modules propres au site
import { AppRoutingModule } from './app-routing.module';
import { NavTopComponent } from './nav-top/nav-top.component';
import { TelemetryComponent } from './telemetry/telemetry.component';
import { CarbonComponent } from './telemetry/carbon/carbon.component';
import { ParticulesComponent } from './telemetry/particules/particules.component';
import { OzoneComponent } from './telemetry/ozone/ozone.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './auth/admin/admin.component';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		RouterModule.forRoot([
			{ path: 'login', component: AuthComponent },
			{ path: 'telemetry', component: TelemetryComponent }
		])
	],
	declarations: [
		AppComponent,
		NavTopComponent,
		TelemetryComponent,
		CarbonComponent,
		ParticulesComponent,
		OzoneComponent,
		AuthComponent,
		AdminComponent,
	],
	bootstrap: [
		AppComponent
	],
	providers: []
}) export class AppModule { }
