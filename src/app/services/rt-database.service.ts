import { Injectable } from '@angular/core';
import { Database, ref, onValue, set, push, update, remove, query, orderByChild, equalTo } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { Business, User } from 'src/app/interfaces/commonObjects.modals';
import { DatabaseName } from '../enums/commonEnums';


@Injectable({
  providedIn: 'root'
})
export class RtDatabaseService {
  constructor(
    private db: Database
) { }

  //Returns entire database
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

  //Adds entry to database is of type : Business | Any | Other | Type
  add(databaseName: DatabaseName, entry: Business): Promise<void> {
    const businessRef = push(ref(this.db, databaseName));
    return set(businessRef, entry);
  }

  update(databaseName: DatabaseName, id: string, partial: Partial<Business> | Partial<User>): Promise<void> {

    switch (databaseName) {
      case 'businesses':
        const updateObj: Partial<Business> = { ...partial };
        const businessRef = ref(this.db, databaseName + `/${id}`);
        return update(businessRef, updateObj);
      case 'users':
        const updateObjUser: Partial<User> = { ...partial };
        const userRef = ref(this.db, databaseName + `/${id}`);
        return update(userRef, updateObjUser);
    }

    const updateObj: Partial<Business> = { ...partial };
    const businessRef = ref(this.db, databaseName + `/${id}`);
    return update(businessRef, updateObj);
  }

  delete(databaseName: DatabaseName, businessId: string): Promise<void> {
    const businessRef = ref(this.db, databaseName + `/${businessId}`);
    return remove(businessRef);
  }

  getAllBusinessIds(databaseName: DatabaseName): Observable<string[]> {
    const businessRef = ref(this.db, databaseName);
    return new Observable<string[]>(observer => {
      onValue(businessRef, (snapshot) => {
        const data = snapshot.val();
        const ids: string[] = data ? Object.keys(data) : [];
        observer.next(ids);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  getByFieldValue(databaseName: DatabaseName, field: string, value:string): Observable<Business[]> {
    const businessRef = ref(this.db, databaseName);
    const rtdbQuery = query(businessRef, orderByChild(field), equalTo(value));

    return new Observable<Business[]>(observer => {
      onValue(rtdbQuery, (snapshot) => {
        const data = snapshot.val();
        const businesses: Business[] = data ? Object.values(data) : [];
        observer.next(businesses);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  getById(databaseName: DatabaseName, businessId: string): Observable<Business> {
    const reference = ref(this.db, `${databaseName}/${businessId}`);
    return this.byDataType(reference, databaseName);
    /* return new Observable<Business>(observer => {
      onValue(businessRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          observer.next(data as Business);
        } else {
          observer.error(new Error('Business not found'));
        }
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    }); */
  }

  getIdById(databaseName: DatabaseName, businessId: string): Observable<string> {
    const reference = ref(this.db, `${databaseName}/${businessId}`);
    return new Observable<string>(observer => {
      onValue(reference, (snapshot) => {
        if (snapshot.exists()) {
          observer.next(businessId);
        } else {
          observer.error(new Error('Business not found'));
        }
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  private byDataType(reference:any, type:DatabaseName): Observable<any> {
    switch (type) { 
      case 'businesses': 
        return new Observable<Business>(observer => {
          onValue(reference, (snapshot) => {
            const data = snapshot.val();
            data ? observer.next(data as Business) : observer.error(new Error('Business not found'));
            observer.complete();
          });
        });
        /* return new Observable<any>(observer => {
          onValue(reference, (snapshot) => {
            const data = snapshot.val();
            observer.next(data);
            observer.complete();
          }, (error) => {
            observer.error(error);
          });
        }); */
      default: 
        return of(null);
      }
  }

  deleteEntireDatabase( ): Promise<void> {
    const rootRef = ref(this.db, '/');
    return remove(rootRef);
  }

  getBusinessCategoryAndEmailById(databaseName: DatabaseName, businessId: string, fields: Array<string>): Observable<{ businessCategory: string, businessEmail: string }> {
    const reference = ref(this.db, `${databaseName}/${businessId}`);
    return new Observable<{ businessCategory: string, businessEmail: string }>(observer => {
      onValue(reference, (snapshot) => {
        const data = snapshot.val();
        if (data) {

          const selectedFields = this.getSelectedFields(fields,data);

          observer.next(selectedFields);
        } else {
          observer.error(new Error('Business not found'));
        }
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  private getSelectedFields(fields: Array<string>, data: any): any {
    const selectedFields: { [key: string]: any } = {};
    fields.forEach(field => {
      selectedFields[field] = data[field];
    });
    return selectedFields;

  }

}
