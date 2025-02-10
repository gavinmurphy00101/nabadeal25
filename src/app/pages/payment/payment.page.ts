import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/app/interfaces/commonObjects.modals';
import { AppModule } from 'src/app/app/app.module';
import { StripeFactoryService, StripeInstance, NGX_STRIPE_VERSION } from "ngx-stripe";
import { FirestoreService } from 'src/app/services/firestore.service';
import { RtDatabaseService } from 'src/app/services/rt-database.service';
import { DatabaseBusinessFields, DatabaseName } from 'src/app/enums/commonEnums';
import { firstValueFrom, pipe, take } from 'rxjs';
/* import { HttpClient, HttpResponse } from '@angular/common/http'; */
/* import { switchMap } from "rxjs";
import { environment } from 'src/environments/environment';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Firestore } from '@angular/fire/firestore'; */
interface IStripeSession {
  id: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AppModule],
  providers: [FirestoreService, AppModule]

})
export class PaymentPage implements OnInit {
  //businessDetails: Business = {} as Business;

  businessDetails: Business = {
    
      activeDeal:'active',
      businessName:'string',
      description:'string',
      businessPhone:'string',
      businessEmail:'string', 
      businessWebsite:'string' ,
      businessCategory:'string',
      businessFormattedAddress:'string',
      businessImageUrl:'string',
      businessAddress:'string'
  }

    /* public stripe!: StripeInstance; */
  public stripeAmount!: number;
  isLoading: boolean = false;
  businesses: Business[] = [];
 

  constructor(private navigationService : NavigationService, 
      private route: ActivatedRoute,
      private cdr: ChangeDetectorRef,
    /*   private http: HttpClient, */
      /* private stripeFactory: StripeFactoryService,*/
      private firestoreService : FirestoreService,
      private RTDB : RtDatabaseService ) { }

  async ngOnInit() {

    //FIRESTORE
    //this.addBusinessToFirestore(); //good
    //this.fetchBusinesses(); //good
    //this.firestoreService.deleteCollection(DatabaseName.Businesses); //good
    /* this.firestoreService.getOnlyFieldsById(
      DatabaseName.Businesses, 'iJCIk0gG0eyO1r5av8xy', [DatabaseBusinessFields.ActiveDeal, DatabaseBusinessFields.BusinessCategory]).subscribe(fields => {
        console.log('Fetched selected fields:', fields);
    });  *///good
    /* this.firestoreService.getActiveBusinesses(DatabaseName.Businesses).subscribe(businesses => {
      console.log(1, businesses);
    }); */ //good

    //REALTIME DATABASE
    //const uids: string[] = await this.getAllBusinessIds(); good
    //this.RTDB.add(DatabaseName.Businesses, this.businessDetails) good
    //this.RTDB.deleteEntireDatabase();good
    //this.updateBusiness(); good
    //this.getBusinessCategorys(); good
    //this.getBusinessById(); good
    //this.getBusinessidbyid(); good
    
    /* this.RTDB.getByFieldValue(DatabaseName.Businesses, 'activeDeal', 'notactive').subscribe(businesses => {
      this.businesses = businesses;
      console.log('Fetched businesses:', this.businesses);
    }); */

   /*  this.getParams()
    setTimeout(() => {

      this.cdr.detectChanges(); // Trigger change detection        
    },300); */

   /*  this.stripe=
    this.stripeFactory.create('kskskjdklsjdkljsdklvj' );//environment.stripePublicKey
    this.stripeAmount = 100; */
  }

   addBusinessToFirestore() {
    this.firestoreService.add(DatabaseName.Businesses, this.businessDetails)
      .then((returnVal) => {
        console.log('Business added to Firestore successfully', returnVal);
      })
      .catch(error => {
        console.error('Error adding business to Firestore: ', error);
      });
  }

  public getParams() {

    this.route.paramMap.subscribe(params => {

      this.businessDetails.activeDeal = params.get('activeDeal') ?? 'a';
      this.businessDetails.businessName = params.get('name') ?? 'b';
      this.businessDetails.description = params.get('description') ?? 'c';
      this.businessDetails.businessEmail = params.get('businessEmail') ?? 'd';
      this.businessDetails.businessPhone = params.get('businessPhone') ?? 'e';
      this.businessDetails.businessWebsite = params.get('businessWebsite') ?? 'f';
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

 /*  checkout() {
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
 */
}
