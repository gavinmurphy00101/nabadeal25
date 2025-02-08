import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc,collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Business } from '../interfaces/commonObjects.modals';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore = inject(Firestore)
  constructor() { }

  addBusiness(business: any): Promise<any> {
    const businessCollection = collection(this.firestore, 'businesses');
    return addDoc(businessCollection, business);
  }

  getBusinesses(): Observable<Business[]> {
    const businessCollection = collection(this.firestore, 'businesses');
    return collectionData(businessCollection, { idField: 'id' }) as Observable<Business[]>;
  }
}