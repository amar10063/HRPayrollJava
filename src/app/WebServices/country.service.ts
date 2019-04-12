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
import { DesignationBody } from '../HRPayroll/employee/EmployeeApiResponse/DesignationBody';
import { DepartmentBody } from '../HRPayroll/employee/EmployeeApiResponse/DepartmentBody';
import { LocationBody } from '../HRPayroll/employee/EmployeeApiResponse/LocationBody';
import { GetPostalBody } from '../SystemAdministration/country/PostalDetails/GetPostalBody';
import { GetPostalResponse } from '../SystemAdministration/country/PostalDetails/GetPostalResponse';
import { DeleteStateBody } from '../SystemAdministration/country/StateDetails/DeleteStateBody';
import { DeleteCityBody } from '../SystemAdministration/country/CityDetails/DeleteCityBody';
import { DeletePostalBody } from '../SystemAdministration/country/PostalDetails/DeletePostalBody';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { 
  }
  saveCountry(countryBody: CountryBody): Observable<CountryResponse> {
    return this.httpClient.post<CountryResponse>(ServiceUrls.baseUrls + ServiceUrls.saveCountry, JSON.stringify(countryBody), this.httpOptions);

  }
 
getAllDesignation(designationBody: DesignationBody): Observable < any > {
  return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.getAllDesignation, JSON.stringify(designationBody), this.httpOptions);
}
getAllDepartment(departmentBody: DepartmentBody): Observable < any > {
  return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.getAllDepartment, JSON.stringify(departmentBody), this.httpOptions);
}
getLocation(locationBody: LocationBody): Observable < any > {
  this.httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.getLocation, JSON.stringify(locationBody), this.httpOptions);
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
  getPostal(getPostalBody: GetPostalBody): Observable<GetPostalResponse> {
    return this.httpClient.post<GetPostalResponse>(ServiceUrls.baseUrls + ServiceUrls.getPostal, JSON.stringify(getPostalBody), this.httpOptions);
  }
  deleteState(deleteStateBody: DeleteStateBody): Observable<StateResponse> {
    return this.httpClient.post<StateResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteState, JSON.stringify(deleteStateBody), this.httpOptions);
  }
  deleteCity(deleteCityBody: DeleteCityBody): Observable<CityResponse> {
    return this.httpClient.post<CityResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteCity, JSON.stringify(deleteCityBody), this.httpOptions);
  }
  deletePostal(deletePostalBody: DeletePostalBody): Observable<PostalResponse> {
    return this.httpClient.post<PostalResponse>(ServiceUrls.baseUrls + ServiceUrls.deletePostal, JSON.stringify(deletePostalBody), this.httpOptions);
  }
}














