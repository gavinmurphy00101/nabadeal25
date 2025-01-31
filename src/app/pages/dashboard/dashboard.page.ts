import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonMenu, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton, IonLabel, IonItem, IonList } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/services/navigation.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonMenu,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonLabel,
    IonItem,
    IonList,
    IonMenuButton,
    HeaderComponent,
    MenuComponent,
    CommonModule,
    FormsModule],
  providers: [NavigationService]
})
export class DashboardPage implements OnInit {
  public title: string = 'Nabadeal Dashboard';
  public businessMenuItems : Array<any> | undefined;
  constructor( private navigationService: NavigationService) { }

  ngOnInit() {
    this.businessMenuItems = [
      { name: 'Dashboard', slug: 'dashboard'},
      { name: 'Map View', slug: 'dasboard-map'}, 
      { name: 'Create New Deal', slug: 'create-deal'},
      { name: 'Current Deal', slug: 'current-deal'},
      { name: 'Customer View', slug: 'home'}
    ];
  }

  public navigateTo(slug: string){
    this.navigationService.navigate(slug);
  }

}
