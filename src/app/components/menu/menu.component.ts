import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList,  IonButtons, IonButton, IonMenuButton, IonFooter, IonIcon, MenuController } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/services/navigation.service';
import { addIcons } from 'ionicons';
import { logoIonic, home, barChartOutline, diamondOutline, personCircleOutline, mapOutline, locationOutline, pricetagOutline, sparkles, sparklesOutline } from 'ionicons/icons';

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
            IonIcon,
            IonLabel, IonItem, IonList,
            CommonModule
            ],
            providers: [NavigationService]
})
export class MenuComponent  {

  @Input() menuItems: Array<any> | undefined = [];
  @Input() menuid: string = '';
  @Input() business: boolean = false;

  constructor(private navigationService : NavigationService, private menuController: MenuController) {
    addIcons({ 
      logoIonic,
      home,
      barChartOutline,
      diamondOutline,
      personCircleOutline,
      mapOutline,
      locationOutline,
      pricetagOutline,
      sparklesOutline
    });
   }

  public navigateTo(slug: string){
    this.menuid ? this.menuController.close(this.menuid): null;
    this.navigationService.navigate(slug);
  }

}
