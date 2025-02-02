import { Component, OnInit } from '@angular/core';
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
  IonAlert
} from '@ionic/angular/standalone';
import { GooglePlacesAutocompleteComponent } from 'src/app/components/google-places-autocomplete/google-places-autocomplete.component';
import { AlertController } from '@ionic/angular';
import { CreateBusiness, Marker } from 'src/app/interfaces/commonObjects.modals';
import { NavigationService } from 'src/app/services/navigation.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
declare var google: any;
@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.page.html',
  styleUrls: ['./create-business.page.scss'],
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
    HeaderComponent,
    CommonModule,
    FormsModule,
    GooglePlacesAutocompleteComponent],
  providers: [NavigationService]
})
export class CreateBusinessPage implements OnInit {
  enableBackButton: boolean = true;
  title = 'Create Business';
  map: any;
  business: CreateBusiness  = {name:'', description: '', category: '', email: '', phone: '', website: '', contact_name: ''};
  formatted_address: Array<any> | undefined;
  newMarker: any;
  public alertButtons = [
    {
      text: 'Dashboard',
      role: 'dashboard',
      handler: () => {
        this.navigateTo('dashboard')
      },
    },
    {
      text: 'Add Deal',
      role: 'add deal',
      handler: () => {
        this.navigateTo('create-deal')
      },
    },
  ];

  constructor(
    private navigationService: NavigationService, 
    private alertController: AlertController) {}

  ngOnInit() {
    const mapData = sessionStorage.getItem('map');
    this.map = mapData ? JSON.parse(mapData) : null;
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Business Registered',
      subHeader: 'Business wil show up when there is an active deal',
      buttons: this.alertButtons,
    });

    await alert.present();
  }

  public handleNewMarker(newMarker: any) {
    this.populateAddressField(newMarker);
    this.newMarker = newMarker;
  }
  private populateAddressField(newMarker: any) {
    this.formatted_address = newMarker.formatted_address;
  }

  private async pushMarkerToObjectForStorage(marker: Marker) : Promise<any> {
    marker = await this.populateIcon(marker);  
    let arr = [];
    arr.push(marker);

    const markers: string | null = sessionStorage.getItem('markers');
    if (markers === null) {
      sessionStorage.setItem('markers', JSON.stringify(arr));
    } else {
      const parsedMarker: Array<Marker> = JSON.parse(markers);
      parsedMarker.push(marker);
      sessionStorage.setItem('markers', JSON.stringify(parsedMarker));
    }

    return new Promise<void>((resolve, reject) => {
      resolve();
    });
  }

  private async populateIcon(marker: Marker) {
    switch (marker.category) {
      case 'entertainment':
        marker.icon = 'assets/icon/icon.png';
        break;
      case 'food':
        marker.icon = 'assets/icon/icon.png';
        break;
      case 'health':
        marker.icon = 'assets/icon/icon.png';
        break;
      case 'retail':
        marker.icon = 'assets/icon/icon.png';
        break;
      default:
        marker.icon = 'assets/icon/icon.png';
        break;
    }

    return marker;
  }

  public navigateTo(slug: string){
    this.navigationService.navigate(slug);
  }

  

  submitBusiness(){

    const markerObj: Marker = {
      position: { lat: this.newMarker.lat, lng: this.newMarker.lng },
        map: this.map,
        title: this.business.name ? this.business.name : 'My Marker', 
        icon: '',
        category: this.business.category ? this.business.category : 'entertainment',
        name: this.business.name ? this.business.name : 'My Marker',
        description: this.business.description ? this.business.description : 'description',
        activeDeal: false,
        currentDeal: {id:''},
        dealHistory: [],
        id: this.newMarker.id,
        businessPhone: this.business.phone ? this.business.phone : '',
        businessEmail: this.business.email ? this.business.email : '',
        businessWebsite: this.business.website ? this.business.website : '',
    }
    this.pushMarkerToObjectForStorage(markerObj)
      .then(() => this.presentAlert())
  }

}
