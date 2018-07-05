import { Injectable } from '@angular/core';
import { Bottle } from './bottle';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Settings } from './settings';
import { SimpleData } from './simpledata';
import { DBQuery } from './dbquery';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BottleService {

  private dbUrl = 'http://' + environment.ip + ':5000';
  private bottleSource = new BehaviorSubject(new Bottle());
  private querySource = new BehaviorSubject(new DBQuery());
  theBottle = this.bottleSource.asObservable();
  queryString = this.querySource.asObservable();
  bottles = [];
  value = 0;
  message = "";
  sortOrder = -1;

  constructor(private http: HttpClient) { }

  setBottle(bottle: Bottle) {
    this.bottleSource.next(bottle);
  }

  setQuery(query: DBQuery) {
    this.querySource.next(query);
  }

  setMessage(message: string) {
    this.message = message;
  }

  runQuery(query: DBQuery) {
    this.doSearch(query).subscribe(results => {
      this.bottles = results;
      this.value = 0;
      for (var b of results) {
        this.value += Number(b.price);
      }
    });
  }

  getYears(): Observable<string[]> {
    const url = this.dbUrl + '/years';
    return this.http.get<string[]>(url);
  }

  getSettings(): Observable<Settings> {
    const url = this.dbUrl + '/settings';
    return this.http.get<Settings>(url);
  }

  getVineyards(): Observable<string[]> {
    const url = this.dbUrl + '/vineyards';
    return this.http.get<string[]>(url);
  }

  getVarieties(): Observable<string[]> {
    const url = this.dbUrl + '/varieties';
    return this.http.get<string[]>(url);
  }

  getRacks(): Observable<SimpleData[]> {
    const url = this.dbUrl + '/racks';
    return this.http.get<SimpleData[]>(url);
  }

  getRegions(form: string): Observable<SimpleData[]> {
    const url = this.dbUrl + '/regions/' + form;
    return this.http.get<SimpleData[]>(url);
  }

  drinkBottle(id: string): Observable<any> {
    const url = this.dbUrl + '/drink/' + id;
    return this.http.delete(url);
  }

  doSearch(query: DBQuery): Observable<any> {
    const url = this.dbUrl + '/query';
    return this.http.post<any>(url, query, httpOptions);
  }

  sortBy(x: string) {
    this.sortOrder = -this.sortOrder;
    this.bottles.sort((n1,n2) => {
      if (n1[x].toUpperCase() > n2[x].toUpperCase()) {
          return 1 * this.sortOrder;
      }
      if (n1[x].toUpperCase() < n2[x].toUpperCase()) {
          return -1 * this.sortOrder;
      }
      return 0;
    });
  }

  sortByLocation() {
    this.sortOrder = -this.sortOrder;
    this.bottles.sort((n1,n2) => {
      const a = n1.rack + ": " + n1.pri + " " + n1.sec;
      const b = n2.rack + ": " + n2.pri + " " + n2.sec;
      if (a > b) {
        return 1 * this.sortOrder;
      }
      if (a < b) { 
        return -1 * this.sortOrder;
      }
      return 0;
    });
  }

}
