import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-current-deal',
  templateUrl: './current-deal.page.html',
  styleUrls: ['./current-deal.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    HeaderComponent,
    CommonModule,
    FormsModule]
})
export class CurrentDealPage implements OnInit {
  title: string = 'Current Deal';
  enableBackButton: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
