import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList,  IonButtons, IonButton, IonMenuButton, IonFooter } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
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
            CommonModule
            ],
            providers: [NavigationService]
})
export class MenuComponent  {

  @Input() menuItems: Array<any> | undefined = [];
  @Input() menuid: string = '';

  @Input() firstMenuItems: Array<any> | undefined = [];
  @Input() secondMenuItems: Array<any> | undefined = [];



  constructor(private navigationService : NavigationService) { }

  public navigateTo(slug: string){
    this.navigationService.navigate(slug);
  }

}
