import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonTextarea,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonAlert,
  IonSelect,
    IonSelectOption
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/app/interfaces/commonObjects.modals';
import { BusinessCategory } from 'src/app/enums/commonEnums';
import { GooglePlacesAutocompleteComponent } from 'src/app/components/googlemaps/google-places-autocomplete/google-places-autocomplete.component';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-add-location-marker-details',
  templateUrl: './add-location-marker-details.page.html',
  styleUrls: ['./add-location-marker-details.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonInput,
    IonLabel,
    IonTextarea,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonAlert,
    IonSelect,
    IonSelectOption,
    HeaderComponent,
    GooglePlacesAutocompleteComponent, CommonModule, FormsModule]
})
export class AddLocationMarkerDetailsPage implements OnInit {

  enableBackButton: boolean = true;
  title = 'Add Location Marker Details';
  businessDetails: Business = {
      activeDeal: "",
      businessName: "",
      description: "",
      businessPhone: "",
      businessEmail: "",
      businessWebsite: "",
      businessImageUrl: "",
      businessAddress: "",
      businessCategory: ""
    };

  categories = [
      BusinessCategory.Entertainment,
      BusinessCategory.Food, 
      BusinessCategory.Health, 
      BusinessCategory.Retail
  ];
  showImage: boolean = false;
  
  constructor(private route: ActivatedRoute, 
    private navigationService: NavigationService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getParams()
    setTimeout(() => {

      this.cdr.detectChanges(); // Trigger change detection        
    },300); 
  }

  public getParams() { //add to service
    this.route.paramMap.subscribe(params => {
 
      params.keys.forEach(key => {
  
        const value = params.get(key);
        if (value !== null) {
          (this.businessDetails as any)[key] = value;
        }

        console.log(481, this.businessDetails)
      });
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  public  handleNewMarker(newMarker: any) {
    this.showImage = false;
    const imgUrl = newMarker.photos[0].getUrl();

    if (this.businessDetails) {
      this.businessDetails.businessImageUrl = imgUrl ? imgUrl : '';
      this.businessDetails.businessAddress = newMarker.formatted_address;
    }
    //this.businessDetails.businessImageUrl =  newMarker.photos[0].getUrl();
    //this.businessDetails.businessImageUrl = await newMarker.formatted_address;
    this.showImage = true;
  }

  goToNext() {
    console.log(3, this.businessDetails);
    //customer-facing-business-profile
    this.navigationService.navigateWithParams('customer-facing-business-profile', this.businessDetails);
  }


}
