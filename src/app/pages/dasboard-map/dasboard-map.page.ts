import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton } from '@ionic/angular/standalone';
import { MapComponent } from 'src/app/components/googlemaps/map/map.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-dasboard-map',
  templateUrl: './dasboard-map.page.html',
  styleUrls: ['./dasboard-map.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonMenuButton,
    HeaderComponent,
    MapComponent,
    CommonModule, FormsModule],
  providers: [NavigationService]
})
export class DasboardMapPage {
  public title: string = 'Business Map View';
  public enableBackButton: boolean = true;
  public business: boolean = true;
  
  constructor(private navigationService: NavigationService) { }

  public navigateTo(slug: string){
    this.navigationService.navigate(slug);
  }

}
