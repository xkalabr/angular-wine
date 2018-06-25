import { Injectable } from '@angular/core';
import { Bottle } from './bottle';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Settings } from './settings';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BottleService {

  private dbUrl = 'http://' + environment.ip + ':5000';

  sand = ["1999", "2000", "2001"];

  constructor(private http: HttpClient) { }

  getVineyards(): Observable<string[]> {
    return of(this.sand);
  }

  getYears(): Observable<string[]> {
    const url = this.dbUrl + '/years';
    return this.http.get<string[]>(url);
  }

  getSettings(): Observable<Settings> {
    const url = this.dbUrl + '/settings';
    return this.http.get<Settings>(url);
  }
}
