import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { LatLng, Marker, Points } from 'src/app/interfaces/commonObjects.modals';
import {  IonContent } from '@ionic/angular/standalone';
import { DistanceService } from 'src/app/services/distance.service';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [IonContent]
})
export class MapComponent implements OnInit {
  @Output() navigateTo = new EventEmitter<Marker>();
  map:any;
  cpos: LatLng | undefined;
  radiusInKm: number = 100;
  
  constructor(private distanceService : DistanceService) { }

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
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      scaleControl: false,
      rotateControl: false,
      gestureHandling: 'greedy',
      clickableIcons: false,
      disableDefaultUI: true

    });


    const markers: Marker[] = this.getMarkers();

    markers.map(async (element: any) => {
      const points : Points = {
        lat1: currentPosition?.lat,
        lon1: currentPosition?.lng,
        lat2: element.position.lat,
        lon2: element.position.lng
      }
      const showMarker: boolean = this.distanceService.isWithinKilometers(this.radiusInKm, points);
      element.display = showMarker;
    });
    markers ? this.setMarkers(markers, this.map) : null; 
  }

  private getMarkers(): Array<Marker> {
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
    markers.map((element: any, index:number) => {

      const infoWindowHtml = `
        <div id="content">
          <div id="siteNotice">
          </div>
          <img src="assets/icon/favicon.png" alt="logo" style="width: 50px; height: 50px;"/>
          <h1 id="firstHeading" class="firstHeading">${element.name}</h1>
          <div id="bodyContent">
            <p>${element.description}</p>
           
            <button id="seeMoreButton-${index}">See More</button
          </div>
        </div>
      `;

      if(element.display){
        const marker = new google.maps.Marker({
          position: { lat: element.position.lat, lng: element.position.lng },
          map: map,
          title: element.name, 
           icon: element.icon 
         }); 
    
         const infoWindow = new google.maps.InfoWindow({
          content: infoWindowHtml
        })
    
         marker.addListener('click', () => {
          infoWindow.open(map, marker);
          setTimeout(() => {
            this.addInfoWindowClickListener(index, element);
          }, 300);
          
        }); 
      }
      
    });
  }

  addInfoWindowClickListener(index: number, element: any) {
    const button = document.getElementById(`seeMoreButton-${index}`);
    if (button) {
      button.addEventListener('click', () => {
        this.openPublicFacing(element);
      });
    }
  }

  onSeeMoreClick(element: any) {
    console.log('See More clicked for:', element);
    // Add your custom logic here, e.g., navigate to a different page or open a modal
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
    this.cpos = { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
    return { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
  };

  public openPublicFacing( marker: Marker){
    console.log(marker);
    this.navigateTo.emit(marker);
  }

}
