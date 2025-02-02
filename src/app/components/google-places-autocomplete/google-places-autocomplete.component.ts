import { query } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Client } from '@googlemaps/google-maps-services-js';

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
  inputs: []
})
export class GooglePlacesAutocompleteComponent implements OnInit {

  @Output() createMarker = new EventEmitter<{ lat: number; lng: number }[]>();
  newMarker: { lat: any; lng: any; }[] | undefined;

  ngOnInit(): void {
    setTimeout(() => {
      this.initAutocomplete();
    },500);
  }

  @ViewChild('search') search: ElementRef | undefined;
  @Input() map: any;

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
