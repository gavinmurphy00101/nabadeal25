import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dasboard-map',
  templateUrl: './dasboard-map.page.html',
  styleUrls: ['./dasboard-map.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DasboardMapPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
