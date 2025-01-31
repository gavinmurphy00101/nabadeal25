import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton,
  IonList, IonItem, IonLabel, IonInput, IonTextarea
 } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.page.html',
  styleUrls: ['./create-deal.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonMenuButton,
    CommonModule,
    FormsModule],
  providers: [NavigationService]
})
export class CreateDealPage implements OnInit {

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
  }

  public navigateTo(slug: string){
    this.navigationService.navigate(slug);
  }

}
