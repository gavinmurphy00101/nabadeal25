import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/app/interfaces/commonObjects.modals';
import { AppModule } from 'src/app/app/app.module';
import { StripeFactoryService, StripeInstance } from "ngx-stripe";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { switchMap } from "rxjs";
import { environment } from 'src/environments/environment';

interface IStripeSession {
  id: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AppModule]
})
export class PaymentPage implements OnInit {
  businessDetails: Business = {
      activeDeal: "",
      businessName: "",
      description: "",
      businessPhone: "",
      businessEmail: "",
      businessWebsite: "",
    };

    public stripe!: StripeInstance;
  public stripeAmount!: number;
  isLoading: boolean = false;

  constructor(private navigationService : NavigationService, 
      private route: ActivatedRoute,
      private cdr: ChangeDetectorRef,
      private http: HttpClient,
      private stripeFactory: StripeFactoryService) { }

  ngOnInit() {

    this.getParams()
    setTimeout(() => {

      this.cdr.detectChanges(); // Trigger change detection        
    },300);

   /*  this.stripe=
    this.stripeFactory.create('kskskjdklsjdkljsdklvj' );//environment.stripePublicKey
    this.stripeAmount = 100; */
  }

  public getParams() {
    console.log('getParams');
    this.route.paramMap.subscribe(params => {
      console.log(11, params);
      this.businessDetails.activeDeal = params.get('activeDeal') ?? '';
      this.businessDetails.businessName = params.get('name') ?? '';
      this.businessDetails.description = params.get('description') ?? '';
      this.businessDetails.businessEmail = params.get('businessEmail') ?? '';
      this.businessDetails.businessPhone = params.get('businessPhone') ?? '';
      this.businessDetails.businessWebsite = params.get('businessWebsite') ?? '';
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  checkout() {
    this.isLoading = true;
    const host = 'http://localhost:7000';
    this.http.post(host + '/create-checkout-session', { data: { amount: this.stripeAmount * 100 } }, { observe: 'response' })
      .pipe(
        switchMap((response: HttpResponse<Object>) => {
          const session: IStripeSession = response.body as IStripeSession;
          return this.stripe.redirectToCheckout({ sessionId: session.id });
        })
      )
      .subscribe(result => {
        // If `redirectToCheckout` fails due to a browser or network
        if (result.error) {
          console.log(result.error)
        }
      });
  }

}
