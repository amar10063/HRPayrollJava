import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceUrls } from './ServiceUrls';
import { Injectable } from '@angular/core';
import { CountryBody } from '../SystemAdministration/country/CountryDetails/CountryBody';
import { CityBody } from '../SystemAdministration/country/CityDetails/CityBody';
import { CountryResponse } from '../SystemAdministration/country/CountryDetails/CountryResponse';
import { StateBody } from '../SystemAdministration/country/StateDetails/StateBody';
import { CountryDataResponse } from '../SystemAdministration/country/CountryDetails/CountryDataResponse';
import {  GetAllCountryBody } from '../SystemAdministration/country/CountryDetails/GetAllCountryBody';
import { PostalBody } from '../SystemAdministration/country/PostalDetails/PostalBody';
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
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.saveCountry, JSON.stringify(countryBody), this.httpOptions);
  }
  saveCity(cityBody: CityBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.saveCity, JSON.stringify(cityBody), this.httpOptions);
  }
  saveState(stateBody: StateBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.saveState, JSON.stringify(stateBody), this.httpOptions);
  }
  getCountries(getAllCountrybody: GetAllCountryBody): Observable<any>
  {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.getCountry, JSON.stringify(getAllCountrybody), this.httpOptions);
  }
  savePostal(postalBody: PostalBody):Observable<any>
  {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.savePostal, JSON.stringify(postalBody), this.httpOptions);
  }
}




  
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



  



