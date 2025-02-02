import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, MenuController } from '@ionic/angular/standalone';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-my-deals',
  templateUrl: './my-deals.page.html',
  styleUrls: ['./my-deals.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, HeaderComponent, MenuComponent,CommonModule, FormsModule]
})
export class MyDealsPage implements OnInit {
  public title: string = 'My Deals';
  public customerMenuItems = [
    { name: 'Home', slug: 'home'},
    { name: 'My Deals', slug: 'my-deals'}, 
    { name: 'Profile', slug: 'profile'},
    { name: 'Join as business', slug: 'create-business'}
  ];

  constructor(private menuController: MenuController) { }

  ngOnInit() {
  
  }

  menuid = 'mydeals'
  
/* 
  ionViewDidEnter() {
    this.menuController.enable(true, this.menuid)
  }

  ionViewWillLeave() {
    this.menuController.enable(false, this.menuid);
  } */

  handleMenu(e:any){
    
    this.menuController.toggle();
  }

}
