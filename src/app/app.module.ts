import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage'
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AuthGuardModule } from '@angular/fire/auth-guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitleStrategy } from '@angular/router';
import { PageTitleStrategy } from './services/titleStrategy.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage( () => getStorage() ),
    AuthGuardModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: TitleStrategy, useClass: PageTitleStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
