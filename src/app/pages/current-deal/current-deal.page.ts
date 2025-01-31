import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-current-deal',
  templateUrl: './current-deal.page.html',
  styleUrls: ['./current-deal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CurrentDealPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
