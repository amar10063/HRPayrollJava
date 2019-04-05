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
<<<<<< Aarati

  // getCountries(countryBody: CountryBody[]): Observable<any>
  // {
  //   return this.httpClient.post<any>(Urls.baseUrls + Urls.getCountry, JSON.stringify(countryBody), this.httpOptions);
  // }
  // countries(countryBody: CountryBody): Observable<any> {
  //   return this.httpClient.post<any>(Urls.baseUrls + Urls.getCountry, JSON.stringify(countryBody), this.httpOptions);
  // }
  // countries(): Observable<CountryResponse[]> {
  //   return this.httpClient.post<any>(Urls.baseUrls + Urls.getCountry,
  //     .map((response: Response) => response.json())
  //                   );
  // }



  //   cellEditorParams: {
  //     values: countries,
  //     cellRenderer: (params) => params.value.name
  // }

}


