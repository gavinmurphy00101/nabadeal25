import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonMenuButton, IonIcon, IonFooter, IonBackButton, MenuController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, home, barChartOutline, diamondOutline, personCircleOutline, mapOutline, locationOutline, pricetagOutline, sparkles, sparklesOutline, search } from 'ionicons/icons';
import { NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonMenu,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonIcon,
    IonBackButton,
    CommonModule
],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent  implements OnInit {

  @Input() title: string | undefined = 'Nabadeal';
  @Input() enableBackButton: boolean = false;
  @Input() business: boolean = false;
  
  constructor(
    private menuController: MenuController,
    private navigationService: NavigationService) { 
    addIcons({ 
      search,
      personCircleOutline,
    });
  }

  openFirstMenu() {
    this.menuController.open('firstMenu');
  }

  openSecondMenu() {
    this.menuController.open('secondMenu');
  }

  openProfile() {
    this.navigationService.navigate('profile');
  }

  openSearch() {
    
  }

  

  ngOnInit() {}

  

}
