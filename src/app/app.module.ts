import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStripeModule } from 'ngx-stripe';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // your components
  ],
  imports: [
    BrowserModule,
    NgxStripeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }