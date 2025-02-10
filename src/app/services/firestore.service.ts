import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc, updateDoc, query, where, getDocs, getDoc } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { Business, User } from '../interfaces/commonObjects.modals';
import { DatabaseBusinessFields, DatabaseName } from '../enums/commonEnums';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore = inject(Firestore)
  constructor() { }

  add(databaseName: DatabaseName, entry: Business | User): Promise<any> {
    const dbCollection = collection(this.firestore, databaseName);
    return addDoc(dbCollection, entry);
  }

  getAll(databaseName: DatabaseName): Observable<Business[]> {
    const dbCollection = collection(this.firestore, databaseName);
    return collectionData(dbCollection, { idField: 'id' }) as Observable<Business[]>;
  }

  delete(databaseName: DatabaseName, id: string): Promise<void> {
    const documentRef = doc(this.firestore, databaseName +`/${id}`);
    return deleteDoc(documentRef);
  }

  update(databaseName: DatabaseName, id: string, partial: Partial<Business | User>): Promise<void> {
    const businessDoc = doc(this.firestore, databaseName +`/${id}`);
    return updateDoc(businessDoc, partial);
  }

  getByFieldValue(databaseName: DatabaseName, field: DatabaseBusinessFields, value:string): Observable<Business[]> {
    const businessCollection = collection(this.firestore, databaseName);
    const dbQuery = query(businessCollection, where(field, '==', value));
    return collectionData(dbQuery, { idField: 'id' }) as Observable<Business[]>;
  }

  async deleteCollection(databaseName: DatabaseName): Promise<void> {
    const businessCollection = collection(this.firestore, databaseName);
    const querySnapshot = await getDocs(businessCollection);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  }

  getOnlyFieldsById(databaseName: DatabaseName, id: string, fields: DatabaseBusinessFields[]): Observable<{ businessCategory: string, businessEmail: string }> {
    const documentRef = doc(this.firestore, `${databaseName}/${id}`);
    return from(getDoc(documentRef).then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        return this.getSelectedFields(fields,data);
      } else {
        throw new Error('Business not found');
      }
    }));
  }

  getDocumentById(databaseName: DatabaseName, id: string): Observable<Business | User> {
    const documentRef = doc(this.firestore, `${databaseName}/${id}`);
    return from(getDoc(documentRef).then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.data() as Business | User;
      } else {
        throw new Error('Document not found');
      }
    }));
  }

  private getSelectedFields(fields: Array<string>, data: any): any {
    const selectedFields: { [key: string]: any } = {};
    fields.forEach(field => {
      selectedFields[field] = data[field];
    });
    return selectedFields;

  }

  private byDataType(reference:any, type:DatabaseName): Observable<any> {
      switch (type) { 
        case 'businesses': 
          return new Observable<Business>(observer => {
            /* onValue(reference, (snapshot:any) => {
              const data = snapshot.val();
              data ? observer.next(data as Business) : observer.error(new Error('Business not found'));
              observer.complete(); 
            });*/
          });
        default: 
          return of(null);
        }
  }

  
}