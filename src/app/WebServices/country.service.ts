import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { LocationBody } from '../SystemAdministration/organization/LocationBody';
import { GetLocationBody } from '../SystemAdministration/organization/GetLocationBody';
import { DeleteLocationBody } from '../SystemAdministration/organization/DeleteLocationBody';
import { DepartmentBody } from '../SystemAdministration/organization/DepartmentBody';
import { DeleteDepartmentBody } from '../SystemAdministration/organization/DeleteDepartmentBody';
import { DesignationBody } from '../SystemAdministration/organization/DesignationBody';
import { DeleteDesignationBody } from '../SystemAdministration/organization/DeleteDesignationBody';
import { Observable } from 'rxjs';
import { ServiceUrls } from './ServiceUrls';
import { Injectable } from '@angular/core';
import { HighSchoolModel } from '../HRPayroll/Education/HighSchoolModel';
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
import { GetAllDesignationBody } from '../HRPayroll/employee/EmployeeApiResponse/GetAllDesignationBody';
import { GetAllDepartmentBody } from '../HRPayroll/employee/EmployeeApiResponse/GetAllDepartmentBody';
import { GetSchoolModel } from '../HRPayroll/Education/GetSchoolModel';

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

  doLogin(countryBody: CountryBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.saveCountry, JSON.stringify(countryBody), this.httpOptions);

  }
  doLocation(locationBody: LocationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.AddLocation, JSON.stringify(locationBody), this.httpOptions);
  }
  doGetLocation(getLocationBody: GetLocationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.getLocation, JSON.stringify(getLocationBody), this.httpOptions);
  }
  getAllDepartment(departmentBody: GetAllDepartmentBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.getAllDepartment, JSON.stringify(departmentBody), this.httpOptions);
  }
  doDeleteLocation(deleteLocationBody: DeleteLocationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.DeleteLocation, JSON.stringify(deleteLocationBody), this.httpOptions);
  }
  doDepartment(departmentBody: DepartmentBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.AddDepartment, JSON.stringify(departmentBody), this.httpOptions);
  }
  doDeleteDepartment(deleteDepartmentBody: DeleteDepartmentBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.DeleteDepartment, JSON.stringify(deleteDepartmentBody), this.httpOptions);
  }
  doDesignation(designationBody: DesignationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.AddDesignation, JSON.stringify(designationBody), this.httpOptions);
  }
  doDeleteDesignation(deleteDesignationBody: DeleteDesignationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.DeleteDesignation, JSON.stringify(deleteDesignationBody), this.httpOptions);
  }

  getAllDesignation(designationBody: GetAllDesignationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.getAllDesignation, JSON.stringify(designationBody), this.httpOptions);
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

  doHighSchoolSave(highSchool: HighSchoolModel): Observable<any> { 
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.highSchoolApi, JSON.stringify(highSchool), this.httpOptions);
  }

  doGetHighSchoolData(getHighSchoolUserId : GetSchoolModel): Observable<any> { 
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.getSchoolDataApi, JSON.stringify(getHighSchoolUserId), this.httpOptions);
  }
  
}













