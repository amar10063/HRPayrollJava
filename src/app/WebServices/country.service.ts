import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceUrls } from './ServiceUrls';
import { Injectable } from '@angular/core';
import { CountryBody } from '../SystemAdministration/country/CountryDetails/CountryBody';
import { CityBody } from '../SystemAdministration/country/CityDetails/CityBody';
import { CountryResponse } from '../SystemAdministration/country/CountryDetails/CountryResponse';
import { StateBody } from '../SystemAdministration/country/StateDetails/StateBody';
import { CountryDataResponse } from '../SystemAdministration/country/CountryDetails/CountryDataResponse';
import { GetAllCountryBody } from '../SystemAdministration/country/CountryDetails/GetAllCountryBody';
import { PostalBody } from '../SystemAdministration/country/PostalDetails/PostalBody';
import { CityResponse } from '../SystemAdministration/country/CityDetails/CityResponse';
import { StateResponse } from '../SystemAdministration/country/StateDetails/StateResponse';
import { PostalResponse } from '../SystemAdministration/country/PostalDetails/PostalResponse';
import { DeleteCountryBody } from '../SystemAdministration/country/CountryDetails/DeleteCountryBody';
import { GetStateBody } from '../SystemAdministration/country/StateDetails/GetStateBody';
import { GetStateResponse } from '../SystemAdministration/country/StateDetails/GetStateResponse';
import { GetCityBody } from '../SystemAdministration/country/CityDetails/GetCityBody';
import { GetCityResponse } from '../SystemAdministration/country/CityDetails/GetCityResponse';
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


  doLogin(countryBody: CountryBody): Observable<CountryResponse> {
    return this.httpClient.post<CountryResponse>(ServiceUrls.baseUrls + ServiceUrls.saveCountry, JSON.stringify(countryBody), this.httpOptions);
  }
  saveCity(cityBody: CityBody): Observable<CityResponse> {
    return this.httpClient.post<CityResponse>(ServiceUrls.baseUrls + ServiceUrls.saveCity, JSON.stringify(cityBody), this.httpOptions);
  }
  saveState(stateBody: StateBody): Observable<StateResponse> {
    return this.httpClient.post<StateResponse>(ServiceUrls.baseUrls + ServiceUrls.saveState, JSON.stringify(stateBody), this.httpOptions);
  }
  getCountries(getAllCountrybody: GetAllCountryBody): Observable<CountryDataResponse> {
    return this.httpClient.post<CountryDataResponse>(ServiceUrls.baseUrls + ServiceUrls.getCountry, JSON.stringify(getAllCountrybody), this.httpOptions);
  }
  savePostal(postalBody: PostalBody): Observable<PostalResponse> {
    return this.httpClient.post<PostalResponse>(ServiceUrls.baseUrls + ServiceUrls.savePostal, JSON.stringify(postalBody), this.httpOptions);
  }
  deleteCountry(deleteCountryBody: DeleteCountryBody): Observable<CountryResponse> {
    return this.httpClient.post<PostalResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteCountry, JSON.stringify(deleteCountryBody), this.httpOptions);
  }
  getStates(getStateBody: GetStateBody): Observable<GetStateResponse> {
    return this.httpClient.post<GetStateResponse>(ServiceUrls.baseUrls + ServiceUrls.getState, JSON.stringify(getStateBody), this.httpOptions);
  }
  getCity(getCityBody: GetCityBody): Observable<GetCityResponse> {
    return this.httpClient.post<GetCityResponse>(ServiceUrls.baseUrls + ServiceUrls.getCity, JSON.stringify(getCityBody), this.httpOptions);
  }
}













