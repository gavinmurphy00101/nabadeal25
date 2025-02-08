import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStripeModule } from 'ngx-stripe';
import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    // your components
  ],
  imports: [
    BrowserModule,
    NgxStripeModule.forRoot(),
    NgxStripeModule.forRoot(),
    
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }