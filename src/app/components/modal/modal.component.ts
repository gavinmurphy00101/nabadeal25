import { Component, OnInit } from '@angular/core';
import { IonItem, IonTitle, IonButtons, IonButton,IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonItem, IonTitle, IonButtons, IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle]
})
export class ModalComponent  implements OnInit {

  //make this an input
  timeLeft: number = 38

  constructor() { }

  ngOnInit() {}

}
