import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { IonMenu, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonMenuButton, IonFooter } from '@ionic/angular/standalone';


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
    IonMenuButton
],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent  implements OnInit {

  @Input() title: string = 'Nabadeal';
  
  constructor() { }

  ngOnInit() {}

}
