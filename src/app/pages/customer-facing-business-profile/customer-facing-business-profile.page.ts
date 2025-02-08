import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonLabel, IonText } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { Business } from 'src/app/interfaces/commonObjects.modals';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-customer-facing-business-profile',
  templateUrl: './customer-facing-business-profile.page.html',
  styleUrls: ['./customer-facing-business-profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    IonLabel,
    IonText,
    HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerFacingBusinessProfilePage implements OnInit {

  pageTitle: string = 'Customer Facing Business Profile';
  businessId: string | null = null;
  businessDetails: Business = {} as Business;

  constructor(
    private navigationService : NavigationService, 
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) { }

ionPageWillEnter(){
  
}

  ngOnInit() {

    this.getParams()
    setTimeout(() => {

      this.cdr.detectChanges(); // Trigger change detection        
    },300); 
  }

  public getParams() {
    this.route.paramMap.subscribe(params => {
      console.log(11, params);

      /* params.keys.forEach(key => {
        console.log(7978979, key)
        const value = params.get(key);
        if (value !== null) {
          (this.businessDetails as any)[key] = value || ''
        }
        console.log(7978979, this.businessDetails)
      }); */
      this.businessDetails.activeDeal = params.get('activeDeal') ?? '';
      this.businessDetails.businessName = params.get('name') ?? '';
      this.businessDetails.description = params.get('description') ?? '';
      this.businessDetails.businessEmail = params.get('businessEmail') ?? '';
      this.businessDetails.businessPhone = params.get('businessPhone') ?? '';
      this.businessDetails.businessWebsite = params.get('businessWebsite') ?? '';
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  goToPayment(){
    this.navigationService.navigate('payment');
  }

}
