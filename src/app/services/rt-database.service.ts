import { Injectable } from '@angular/core';
import { Database, ref, onValue, set, push, update, remove, query, orderByChild, equalTo } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { Business } from 'src/app/interfaces/commonObjects.modals';
import { DatabaseName } from '../enums/commonEnums';


@Injectable({
  providedIn: 'root'
})
export class RtDatabaseService {
  constructor(private db: Database) { }

  get(databaseName: DatabaseName): Observable<Business[]> {
    const businessRef = ref(this.db, databaseName);
    return new Observable<Business[]>(observer => {
      onValue(businessRef, (snapshot) => {
        const data = snapshot.val();
        const businesses: Business[] = data ? Object.values(data) : [];
        observer.next(businesses);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  add(databaseName: DatabaseName, business: Business): Promise<void> {
    const businessRef = push(ref(this.db, databaseName));
    return set(businessRef, business);
  }

  update(databaseName: string, businessId: string, business: Partial<Business>): Promise<void> {
    const businessRef = ref(this.db, databaseName + `/${businessId}`);
    return update(businessRef, business);
  }

  deleteBusiness(businessId: string): Promise<void> {
    const businessRef = ref(this.db, `businesses/${businessId}`);
    return remove(businessRef);
  }

  getByFieldValue(databaseName: DatabaseName, field: string, value:string): Observable<Business[]> {
    const businessRef = ref(this.db, databaseName);
    const inactiveQuery = query(businessRef, orderByChild(field), equalTo(value));
    return new Observable<Business[]>(observer => {
      onValue(inactiveQuery, (snapshot) => {
        const data = snapshot.val();
        const businesses: Business[] = data ? Object.values(data) : [];
        observer.next(businesses);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

}
