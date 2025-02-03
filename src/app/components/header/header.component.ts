import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonMenuButton, IonFooter, IonBackButton, MenuController } from '@ionic/angular/standalone';


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
    IonBackButton,
    CommonModule
],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent  implements OnInit {

  @Input() title: string = 'Nabadeal';
  @Input() enableBackButton: boolean = false;
  @Input() business: boolean = false;
  
  constructor(private menuController: MenuController) { }

  openFirstMenu() {
    this.menuController.open('firstMenu');
  }

  openSecondMenu() {
    this.menuController.open('secondMenu');
  }

  ngOnInit() {}

  

}
