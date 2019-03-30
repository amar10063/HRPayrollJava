import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from './Urls';
import { Injectable } from '@angular/core';
import { CountryBody } from '../SystemAdministration/country/CountryBody';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  doLogin(countryBody: CountryBody): Observable<any> {
    return this.httpClient.post<any>(Urls.baseUrls + Urls.saveCountry, JSON.stringify(countryBody), this.httpOptions);
  }
}


