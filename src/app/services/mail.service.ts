import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class MailService {

  constructor(private http: HttpClient) { 

    
  }

  sendMail(): Observable<Object> {
    const url = 'https://helloworld-sajsaswuha-uc.a.run.app/'; // Update with your actual project ID
    return this.http.get(url);
  }
}
