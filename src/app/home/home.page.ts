import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList,  IonButtons, IonButton, IonMenuButton, IonFooter, IonIcon, ModalController } from '@ionic/angular/standalone';
import { MapComponent } from '../components/map/map.component';
import { NavigationService } from '../services/navigation.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { MenuComponent } from '../components/menu/menu.component';
import { ModalComponent } from '../components/modal/modal.component';
import { LatLng, MenuItems } from '../interfaces/commonObjects.modals';
import { MenuService } from '../services/menu.service';
import { MenuType } from '../enums/commonEnums';
import { addIcons } from 'ionicons';
import { filterOutline } from 'ionicons/icons';
import { GooglePlacesAutocompleteComponent } from '../components/google-places-autocomplete/google-places-autocomplete.component';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonMenu,
            IonFooter,
            IonHeader,
            IonToolbar,
            IonTitle,
            IonButtons,
            IonButton,
            IonMenuButton,
            IonContent,
            IonLabel, IonItem, IonList, IonIcon,
            MapComponent,
            GooglePlacesAutocompleteComponent,
            HeaderComponent,
            MenuComponent,
            CommonModule
            ],

  providers: [NavigationService] 
})

export class HomePage implements OnInit {
  public title: string = 'Nabadeal';
  map:any;
  cpos: LatLng | undefined;
  customerMenuItems: Array<MenuItems> = [];

  constructor(
    private navigationService: NavigationService,
    private menuService : MenuService,
    private modalController: ModalController
  ) {
    addIcons({ 
          filterOutline
        });
  }
  
  async ngOnInit() {
    this.customerMenuItems = this.menuService.getMenuItems(MenuType.Home);
  }

  navigateTo(slug: string){
    this.navigationService.navigate(slug);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'half-height-modal',
      componentProps:{
      },
      breakpoints: [0,0.4],
      initialBreakpoint: 0.4
    });
    return await modal.present();
  }
}
