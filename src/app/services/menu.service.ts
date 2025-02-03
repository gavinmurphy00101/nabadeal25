import { Injectable } from '@angular/core';
import { MenuItems } from '../interfaces/commonObjects.modals';
import { MenuType } from '../enums/commonEnums';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenuItems(menuFor: MenuType): Array<MenuItems> {
    
    let menuItems: Array<MenuItems> = [];
    if(menuFor === 'home'){
       menuItems = [
        { name: 'Home', 
          slug: 'home', 
          icon: 'home'
        },

        { name: 'My Deals', 
          slug: 'my-deals', 
          icon: 'diamond-outline'
        }, 
        { name: 'Profile', 
          slug: 'profile', 
          icon: 'person-circle-outline'
        },
        { name: 'Join as business', 
          slug: 'create-business', 
          icon: 'location-outline'
        }
      ];
    }
    if(menuFor === 'business'){
      menuItems = [
      { 
        name: 'Dashboard',
         slug: 'dashboard',
         icon: 'bar-chart-outline'
      },
      { 
        name: 'Map View',
         slug: 'dasboard-map',
         icon: 'map-outline'
      },
      { 
        name: 'Create New Deal',
         slug: 'create-deal',
         icon: 'pricetag-outline'
      },
      { 
        name: 'Current Deal',
         slug: 'current-deal',
         icon: 'sparkles-outline'
      },
      { 
        name: 'Customer View',
         slug: 'home',
         icon: 'home'
      }
    ];
    
  }
  return menuItems;
  
  }
}
