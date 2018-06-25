import { Injectable } from '@angular/core';
import { Bottle } from './bottle';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Settings } from './settings';
import { SimpleData } from './simpledata';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BottleService {

  private dbUrl = 'http://' + environment.ip + ':5000';

  constructor(private http: HttpClient) { }

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

  getRegions(): Observable<SimpleData[]> {
    const url = this.dbUrl + '/regions';
    return this.http.get<SimpleData[]>(url);
  }

}
