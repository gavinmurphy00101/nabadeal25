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
  businessDetails: Business = {
    activeDeal: "",
    businessName: "",
    description: "",
    businessPhone: "",
    businessEmail: "",
    businessWebsite: "",
  };

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

  /* console.log(params);
      debugger

        this.businessDetails.activeDeal = params.get('activeDeal') || ""
        //this.businessDetails.address = params.get('address');
        this.businessDetails.businessName = params.get('name') || "";
        //this.businessDetails.businessType = params.get('type');
        this.businessDetails.businessEmail = params.get('businessEmail') || "";
        this.businessDetails.businessPhone = params.get('businessPhone') || ""; 
        this.businessDetails.businessWebsite = params.get('businessWebsite') || "";
        //this.businessDetails.position = params.get('position');
        this.businessDetails.description = params.get('description') || "";
        //this.businessDetails.currentDeal = params.get('currentDeal');
      console.log(this.businessDetails);
      debugger
        //this.cdr.detectChanges(); */
        public getParams() {
          this.route.paramMap.subscribe(params => {
            this.businessDetails.activeDeal = params.get('activeDeal') ?? '';
            this.businessDetails.businessName = params.get('name') ?? '';
            this.businessDetails.description = params.get('description') ?? '';
            this.businessDetails.businessEmail = params.get('businessEmail') ?? '';
            this.businessDetails.businessPhone = params.get('businessPhone') ?? '';
            this.businessDetails.businessWebsite = params.get('businessWebsite') ?? '';
            this.cdr.detectChanges(); // Trigger change detection
          });
        }

}
