import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonMenu, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonMenuButton, IonIcon, IonFooter, IonBackButton, IonInput, MenuController } from '@ionic/angular/standalone';
import { LatLng } from 'src/app/interfaces/commonObjects.modals';

declare var google: any;
declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonIcon,
    IonBackButton,
    IonInput
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GooglePlacesComponent  implements OnInit {

  @Input() map: any;
  @Output() createMarker = new EventEmitter<Array<LatLng>>();
  @ViewChild('search') search: ElementRef | undefined;

  newMarker: Array<LatLng> | undefined;
  searchResults: any[] = [];;
  autocomplete: any;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.initAutocomplete();
    },500);
  }

  async initAutocomplete() {
    if(this.search) {
      this.autocomplete = new google.maps.places.Autocomplete(this.search.nativeElement, { 
        componentRestrictions: [{country: 'US'}],
        fields: ['ALL'] ,
      })

      this.autocomplete.addListener('place_changed', ()=>{
        const place = this.autocomplete.getPlace();
        const newMarker = place;
        this.createNewMarker({
          ...newMarker,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        })
      });
    }
    
  }

  createNewMarker(newMarker:any) {
    this.createMarker.emit(newMarker);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter')
  }

  

  

}
