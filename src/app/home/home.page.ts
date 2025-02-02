import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList,  IonButtons, IonButton, IonMenuButton, IonFooter, MenuController, ModalController } from '@ionic/angular/standalone';
import { MapComponent } from '../components/map/map.component';
import { NavigationService } from '../services/navigation.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { MenuComponent } from '../components/menu/menu.component';
import { ModalComponent } from '../components/modal/modal.component';

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
            IonLabel, IonItem, IonList,
            MapComponent,
            HeaderComponent,
            MenuComponent,
            CommonModule
            ],

  providers: [NavigationService] 
})

export class HomePage implements OnInit {
  public title: string = 'Nabadeal';
  map:any;
  cpos: { lat: number; lng: number; } | undefined;
  customerMenuItems: Array<any> | undefined = [];

  constructor(
    private navigationService: NavigationService,
    private menu : MenuController,
    private modalController: ModalController
  ) {}
  
  async ngOnInit() {
    this.customerMenuItems = [
      { name: 'Home', slug: 'home'},
      { name: 'My Deals', slug: 'my-deals'}, 
      { name: 'Profile', slug: 'profile'},
      { name: 'Join as business', slug: 'create-business'}
    ];

  }

  test(e:any){
    this.menu.toggle();
  }

  navigateTo(slug: string){
    this.navigationService.navigate(slug);
  }

  test1(){
    alert('test');
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
