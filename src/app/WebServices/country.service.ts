import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { ServiceUrls } from './ServiceUrls';
import { Injectable } from '@angular/core';
import { CountryBody } from '../SystemAdministration/country/CountryBody';
import {LocationBody} from '../SystemAdministration/organization/LocationBody';
import {GetLocationBody} from '../SystemAdministration/organization/GetLocationBody';
import {DeleteLocationBody} from '../SystemAdministration/organization/DeleteLocationBody';
import {DepartmentBody} from '../SystemAdministration/organization/DepartmentBody';
import {DeleteDepartmentBody} from '../SystemAdministration/organization/DeleteDepartmentBody';
import {DesignationBody} from '../SystemAdministration/organization/DesignationBody';
import {DeleteDesignationBody} from '../SystemAdministration/organization/DeleteDesignationBody';

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
  doLocation(locationBody: LocationBody): Observable<any> {
  return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.AddLocation, JSON.stringify(locationBody), this.httpOptions);
}
doGetLocation(getLocationBody: GetLocationBody): Observable<any> {
  return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.getLocation, JSON.stringify(getLocationBody), this.httpOptions);
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
}
