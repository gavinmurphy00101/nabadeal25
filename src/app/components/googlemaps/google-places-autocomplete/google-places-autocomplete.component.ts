import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Client } from '@googlemaps/google-maps-services-js';
import { LatLng } from 'src/app/interfaces/commonObjects.modals';

const client = new Client({});
declare var google: any;
declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-google-places-autocomplete',
  templateUrl: './google-places-autocomplete.component.html',
  styleUrls: ['./google-places-autocomplete.component.scss'],
  standalone: true,
  inputs: [ ],

      schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GooglePlacesAutocompleteComponent implements OnInit {

  @Input() map: any;
  @Output() createMarker = new EventEmitter<Array<LatLng>>();
  @ViewChild('search') search: ElementRef | undefined;

  newMarker: Array<LatLng> | undefined;

  ngOnInit(): void {
    setTimeout(() => {
      this.initAutocomplete();
    },500);
  }

  

  searchResults: any[] = [];;
  autocomplete: any;

  constructor() { }

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
