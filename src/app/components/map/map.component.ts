import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { LatLng, Marker } from 'src/app/interfaces/commonObjects.modals';
import {  IonContent } from '@ionic/angular/standalone';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [IonContent]
})
export class MapComponent implements OnInit {
  map:any;
  cpos: LatLng | undefined;
  
  constructor() { }

  async ngOnInit() {
    const currentPosition = await this.printCurrentPosition();

     this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: currentPosition?.lat, lng: currentPosition?.lng },
      zoom: 12,
      styles: [
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#e0efef"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "hue": "#1900ff"
                },
                {
                    "color": "#c0e8e8"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 700
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#7dcdcd"
                }
            ]
        }
    ],
      mapTypeControl: false,
      streetViewControl: false
    });


    const markers: Marker[] = this.getMarkers();
    markers ? this.setMarkers(markers, this.map) : null; 
  }

  private getMarkers(): Array<Marker> {
        //fetch markers from a service
    let markers: Array<Marker> = [];
    if(sessionStorage.getItem('markers') != null){
      if(sessionStorage.getItem('markers')){
        const markersString: string | null = sessionStorage.getItem('markers');
        markers = markersString ? JSON.parse(markersString) : null;
      }
    } 
    return markers;
  }

  private setMarkers(markers: Marker[], map: any): void {
    markers.map((element: any) => {

      const marker = new google.maps.Marker({
        position: { lat: element.position.lat, lng: element.position.lng },
        map: map,
        title: element.name, 
         icon: element.icon 
       }); 
  
       const infoWindow = new google.maps.InfoWindow({
        content: '<p>Additional info goes here.</p>'
      }); 
  
       marker.addListener('click', () => {
        infoWindow.open(map, marker);
      }); 
    });
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.cpos = { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
    return { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
  };

}
