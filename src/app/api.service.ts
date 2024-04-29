import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'https://www.timeapi.io/api/TimeZone/AvailableTimeZones';
  API_URL = 'https://timeapi.io/api/Conversion/ConvertTimeZone';

  public get(): Observable<string[]> {
    return this.http.get<string[]>(this.BASE_URL);
  }
  public post(url: string, data: any): Observable<any> {
    return this.http.post(this.API_URL, data);
  }
}
