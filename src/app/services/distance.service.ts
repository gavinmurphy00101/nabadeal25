import { Injectable } from '@angular/core';
import { Haversine } from '../classes/distance.class';
import { Points } from '../interfaces/commonObjects.modals';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  constructor() { }

  isWithinKilometers(distanceinKm: number, points : Points): boolean {
    const distanceInKm = Haversine(points.lat1, points.lon1, points.lat2, points.lon2);
    //const distanceInMiles = distanceInKm * 0.621371; // Convert kilometers to miles
    return distanceInKm <= distanceinKm;
  }
}