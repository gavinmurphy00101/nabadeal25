import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,IonButton, IonMenuButton } from '@ionic/angular/standalone';
import { MapComponent } from '../components/map/map.component';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';

declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader,
            IonToolbar,
            IonTitle,
            IonButtons,
            IonButton,
            IonMenuButton,
            IonContent,
            MapComponent,
            ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})

export class HomePage implements OnInit {
  map:any;
  cpos: { lat: number; lng: number; } | undefined;
  constructor(private router: Router) {}

  async ngOnInit() {
    const currentPosition = await this.printCurrentPosition();

     this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: currentPosition?.lat, lng: currentPosition?.lng },
      zoom: 12,
      /* styles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        
      ], */
      mapTypeControl: false,
      streetViewControl: false
    });

    if(sessionStorage.getItem('markers') != null){
     
      if(sessionStorage.getItem('markers')){
        let markers: any = sessionStorage.getItem('markers');
        markers = JSON.parse(markers);
        markers.map((element: any) => {

          const marker = new google.maps.Marker({
            position: { lat: element.position.lat, lng: element.position.lng },
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
    else{
      //alert('No markers found')
    }
    
    

    
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
  
    console.log('Current position:', coordinates.coords.latitude, coordinates.coords.longitude);
    this.cpos = { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
    return await { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
  };

  navigateTo(slug: string){
    console.log('navigating to: ', slug);
    this.router.navigate([slug]);
  }
}
