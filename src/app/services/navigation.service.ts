import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marker } from '../interfaces/commonObjects.modals';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, private route: ActivatedRoute) { }

  public navigate(slug: string){
    this.router.navigate([slug]);
  }

  public navigateWithParams(slug: string, params:Marker){
    console.log(34, params);
    this.router.navigate([slug, params]);
  }

  
}
