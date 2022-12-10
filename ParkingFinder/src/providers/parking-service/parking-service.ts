import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

/*
  Generated class for the ParkingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParkingServiceProvider {

  events: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log('Hello ParkingServiceProvider Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getEvents(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/events').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  removeEvent(id) {
    console.log('Remove Item - id = ', id);
    this.http.delete(this.baseURL + '/api/events/' + id).subscribe(res => {
      this.events = res;
      this.dataChangeSubject.next(true);
    })
  }

  addItem(event) {
    this.http.post(this.baseURL + "/api/events/", event).subscribe(res => {
      this.events = res;
      this.dataChangeSubject.next(true);
    });
  }

  signIn() {

  }

  createAccount() {
    
  }

}
