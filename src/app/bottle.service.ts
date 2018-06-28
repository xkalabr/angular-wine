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


  constructor(private http: HttpClient) { }

  setBottle(bottle: Bottle) {
    this.bottleSource.next(bottle);
  }

  setQuery(query: DBQuery) {
    this.querySource.next(query);
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

  getRegions(): Observable<SimpleData[]> {
    const url = this.dbUrl + '/regions';
    return this.http.get<SimpleData[]>(url);
  }

  doSearch(query: DBQuery): Observable<Bottle[]> {
    const url = this.dbUrl + '/query';
    console.log('Received query', query);
    return this.http.post<Bottle[]>(url, query, httpOptions);
  }

}
