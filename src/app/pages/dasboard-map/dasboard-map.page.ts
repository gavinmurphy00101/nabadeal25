import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton } from '@ionic/angular/standalone';
import { MapComponent } from 'src/app/components/map/map.component';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

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
    MapComponent,
    CommonModule, FormsModule],
  providers: [NavigationService]
})
export class DasboardMapPage implements OnInit {

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
  }

  public navigateTo(slug: string){
    this.navigationService.navigate(slug);
  }

}
