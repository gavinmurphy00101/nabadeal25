import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonMenu, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonMenuButton, IonLabel, IonItem, IonList } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/services/navigation.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { MenuItems } from 'src/app/interfaces/commonObjects.modals';
import { MenuService } from 'src/app/services/menu.service';
import { MenuType } from 'src/app/enums/commonEnums';
import { DataItem }from '@swimlane/ngx-charts';
import { PieChartComponent } from 'src/app/components/charts/pie-chart/pie-chart.component';
import { BarChartComponent } from 'src/app/components/charts/bar-chart/bar-chart.component';

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
    PieChartComponent,
    BarChartComponent,
    CommonModule,
    FormsModule],
  providers: [NavigationService]
})
export class DashboardPage implements OnInit {
  public title: string = 'Dashboard';
  public businessMenuItems : Array<MenuItems> | undefined;
  public dataItems: DataItem[] = [
      {
        name: "Germany",
        value: 8940000,
      },
      {
        name: "USA",
        value: 5000000,
      },
      {
        name: "France",
        value: 7200000,
      }
    ]

  constructor( 
    private navigationService: NavigationService,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.businessMenuItems = this.menuService.getMenuItems(MenuType.Business);
  }

  public navigateTo(slug: string){
    this.navigationService.navigate(slug);
  }
}