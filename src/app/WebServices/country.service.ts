import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceUrls } from './ServiceUrls';
import { Injectable } from '@angular/core';
import { CountryBody } from '../SystemAdministration/country/CountryDetails/CountryBody';
import { CityBody } from '../SystemAdministration/country/CityDetails/CityBody';
import { CountryResponse } from '../SystemAdministration/country/CountryDetails/CountryResponse';
import { DesignationBody } from '../HRPayroll/employee/EmployeeApiResponse/DesignationBody';
import { DepartmentBody } from '../HRPayroll/employee/EmployeeApiResponse/DepartmentBody';
import { LocationBody } from '../HRPayroll/employee/EmployeeApiResponse/LocationBody';

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
 

doLogin(countryBody: CountryBody): Observable < any > {
  this.httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  return this.httpClient.post<any>(AllUrls.baseUrls + AllUrls.saveCountry, JSON.stringify(countryBody), this.httpOptions);
}
saveCity(cityBody: CityBody): Observable < any > {
  return this.httpClient.post<any>(AllUrls.baseUrls + AllUrls.saveCity, JSON.stringify(cityBody), this.httpOptions);
}
getAllDesignation(designationBody: DesignationBody): Observable < any > {
  return this.httpClient.post<any>(AllUrls.baseUrls + AllUrls.getAllDesignation, JSON.stringify(designationBody), this.httpOptions);
}
getAllDepartment(departmentBody: DepartmentBody): Observable < any > {
  return this.httpClient.post<any>(AllUrls.baseUrls + AllUrls.getAllDepartment, JSON.stringify(departmentBody), this.httpOptions);
}
getLocation(locationBody: LocationBody): Observable < any > {
  this.httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  return this.httpClient.post<any>(AllUrls.baseUrls + AllUrls.getLocation, JSON.stringify(locationBody), this.httpOptions);
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



  



