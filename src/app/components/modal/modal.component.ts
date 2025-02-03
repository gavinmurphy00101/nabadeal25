import { Component, OnInit } from '@angular/core';
import { IonItem, IonTitle, IonButtons, IonButton,IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonItem, IonTitle, IonButtons, IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle]
})
export class ModalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
