import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor( private http:HttpClient) { }

  sendForm(cardNumber:string, month:string, year:string, CVV:string):any {
    return this.http.post('/endpoint', { cardNumber, month, year, CVV });
  }
}
