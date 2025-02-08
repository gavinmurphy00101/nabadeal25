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
    bleep: HTMLAudioElement;
  
  constructor(private distanceService : DistanceService) { 
    this.bleep = new Audio();
    this.bleep.src = '/assets/sound/pop.mp3';
    this.bleep.load();

  }

  async ngOnInit() {
    const currentPosition = await this.printCurrentPosition();
     this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: currentPosition?.lat, lng: currentPosition?.lng },
      zoom: 12,
      styles: [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6195a0"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#e6f3d6"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#f4d2c5"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#4e4e4e"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#f4f4f4"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#787878"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#eaf6f8"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#eaf6f8"
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
          icon: {
            url: element.icon,
            scaledSize: new google.maps.Size(50, 50) // Adjust the size as needed
          }
         }); 
    
         const infoWindow = new google.maps.InfoWindow({
          content: infoWindowHtml
        })
    
         marker.addListener('click', () => {
            this.runBleep();
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


  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
    this.cpos = { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
    return { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
  };

  public openPublicFacing( marker: Marker){
    this.navigateTo.emit(marker);
  }

  public runBleep(){
    this.bleep.play();
}


}
