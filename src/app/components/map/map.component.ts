import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Marker } from 'src/app/interfaces/commonObjects.modals';
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
  cpos: { lat: number; lng: number; } | undefined;
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

    if(sessionStorage.getItem('markers') != null){
     
      if(sessionStorage.getItem('markers')){
        const markersString: string | null = sessionStorage.getItem('markers');
        const markers: Array<Marker> = markersString ? JSON.parse(markersString) : null
        markers.map((element: any) => {

          const marker = new google.maps.Marker({
            position: { lat: element.position.lat, lng: element.position.lng },
            map: this.map,
            title: element.name, 
             icon: element.icon 
           }); 
      
           const infoWindow = new google.maps.InfoWindow({
            content: '<p>Additional info goes here.</p>'
          }); 
      
           marker.addListener('click', () => {
            infoWindow.open(this.map, marker);
          }); 
        });
      }

     
      /* if(markers != null){
        markers = JSON.parse(markers)
        markers?.forEach(element => {

          const marker = new google.maps.Marker({
            position: { lat: element.lat, lng: element.lng },
            map: this.map,
            title: 'My Marker', 
             icon: 'assets/icon/icon.png' 
           }); 
      
           const infoWindow = new google.maps.InfoWindow({
            content: '<p>Additional info goes here.</p>'
          }); 
      
           marker.addListener('click', () => {
            infoWindow.open(this.map, marker);
          }); 
          
        });
      }
      if(markers){
        
      } */
      
    }
    
    
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.cpos = { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
    return await { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
  };

}
