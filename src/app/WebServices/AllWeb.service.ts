import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocationBody } from './WebServiceBody/OrganizationBody/LocationBody';
import { GetLocationBody } from '../SystemAdministration/organization/GetLocationBody';
import { DeleteLocationBody } from './WebServiceBody/OrganizationBody/DeleteLocationBody';
import { DepartmentBody } from './WebServiceBody/OrganizationBody/DepartmentBody';
import { DeleteDepartmentBody } from './WebServiceBody/OrganizationBody/DeleteDepartmentBody';
import { DesignationBody } from './WebServiceBody/OrganizationBody/DesignationBody';
import { DeleteDesignationBody } from './WebServiceBody/OrganizationBody/DeleteDesignationBody';
import { Observable } from 'rxjs';
import { ServiceUrls } from './ServiceUrls';
import { Injectable } from '@angular/core';
import { HighSchoolBody } from './WebServiceBody/EducationBody/HighSchoolBody';
import { CountryBody } from './WebServiceBody/CountryBody/CountryBody';
import { CityBody } from './WebServiceBody/CountryBody/CityBody';
import { StateBody } from './WebServiceBody/CountryBody/StateBody';
import { CountryDataResponse } from './WebServiceResponse/CountryResponse/GetCountryResponse';
import { UniversalBody } from './WebServiceBody/UniversalBody';
import { PostalBody } from './WebServiceBody/CountryBody/PostalBody';
import { DeleteCountryBody } from './WebServiceBody/CountryBody/DeleteCountryBody';
import { GetStateResponse } from './WebServiceResponse/CountryResponse/GetStateResponse';
import { GetCityResponse } from './WebServiceResponse/CountryResponse/GetCityResponse';
import { GetAllDesignationBody } from '../HRPayroll/employee/EmployeeApiResponse/GetAllDesignationBody';
import { GetAllDepartmentBody } from '../HRPayroll/employee/EmployeeApiResponse/GetAllDepartmentBody';
import { GetAllLocationResponse } from '../HRPayroll/employee/EmployeeApiResponse/GetAllLocationResponse';
import { GetPostalResponse } from './WebServiceResponse/CountryResponse/GetPostalResponse';
import { DeleteStateBody } from './WebServiceBody/CountryBody/DeleteStateBody';
import { DeleteCityBody } from './WebServiceBody/CountryBody/DeleteCityBody';
import { DeletePostalBody } from './WebServiceBody/CountryBody/DeletePostalBody';
import { UniversalResponse } from './WebServiceResponse/UniversalResponse';
import { GetSchoolModel } from '../HRPayroll/Education/GetSchoolModel';
import { GetSchoolDataResponse } from '../HRPayroll/Education/GetSchoolDataResponse';
import {GetDesignationResponse} from '../WebServices/WebServiceResponse/OrganizationResponse/GetDesignationResponse';
import { GetDepartmentResponse } from '../SystemAdministration/organization/DepartmentResponse';
@Injectable({
  providedIn: 'root'
})
export class AllWeb {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) {
  }
  saveCountry(countryBody: CountryBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.saveCountry, JSON.stringify(countryBody), this.httpOptions);
  }
  saveLocation(locationBody: LocationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.AddLocation, JSON.stringify(locationBody), this.httpOptions);
  }
  doGetLocation(getLocationBody: GetLocationBody): Observable<GetAllLocationResponse[]> {
    return this.httpClient.post<GetAllLocationResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getLocation, JSON.stringify(getLocationBody), this.httpOptions);
  }
  updateLocation(updateLocationBody: LocationBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>('http://10.10.10.48:8081' + '/UpdateLocation', JSON.stringify(updateLocationBody), this.httpOptions);
  }
  getDepartment(departmentBody: GetAllDepartmentBody): Observable<GetAllLocationResponse[]> {
    return this.httpClient.post<GetAllLocationResponse[]>('http://10.10.10.48:8081' + '/getDepartment', JSON.stringify(departmentBody), this.httpOptions);
  }
  getDepartmentByUserId(getDepartmentBody: UniversalBody): Observable<GetDepartmentResponse[]> {
    return this.httpClient.post<GetDepartmentResponse[]>('http://10.10.10.48:8081' + '/getDeptByUser', JSON.stringify(getDepartmentBody), this.httpOptions);
  }

  doDeleteLocation(deleteLocationBody: DeleteLocationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.DeleteLocation, JSON.stringify(deleteLocationBody), this.httpOptions);
  }
  saveDepartment(departmentBody: DepartmentBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.AddDepartment, JSON.stringify(departmentBody), this.httpOptions);
  }
  deleteDepartment(deleteDepartmentBody: DeleteDepartmentBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.DeleteDepartment, JSON.stringify(deleteDepartmentBody), this.httpOptions);
  }
  updateDepartment(updateDepartmentBody: DepartmentBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>('http://10.10.10.48:8081' + '/UpdateDepartment', JSON.stringify(updateDepartmentBody), this.httpOptions);
  }
  saveDesignation(designationBody: DesignationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.AddDesignation, JSON.stringify(designationBody), this.httpOptions);
  }
  deleteDesignation(deleteDesignationBody: DeleteDesignationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.DeleteDesignation, JSON.stringify(deleteDesignationBody), this.httpOptions);
  }
  getAllDesignation(designationBody: GetAllDesignationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.getAllDesignation, JSON.stringify(designationBody), this.httpOptions);
  }
  getDesignationByUserId(getDesignationBody: UniversalBody): Observable<GetDesignationResponse[]> {
    return this.httpClient.post<GetDesignationResponse[]>('http://10.10.10.48:8081' + '/getDesignationDataByUser', JSON.stringify(getDesignationBody), this.httpOptions);
  }
  updateDesignation(updateDesignationBody: DesignationBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>('http://10.10.10.48:8081' + '/UpdateDesignation', JSON.stringify(updateDesignationBody), this.httpOptions);
  }
  saveCity(cityBody: CityBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.saveCity, JSON.stringify(cityBody), this.httpOptions);
  }
  saveState(stateBody: StateBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.saveState, JSON.stringify(stateBody), this.httpOptions);
  }
  getCountries(universalBody: UniversalBody): Observable<CountryDataResponse> {
    return this.httpClient.post<CountryDataResponse>(ServiceUrls.baseUrls + ServiceUrls.getCountry, JSON.stringify(universalBody), this.httpOptions);
  }
  savePostal(postalBody: PostalBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.savePostal, JSON.stringify(postalBody), this.httpOptions);
  }
  deleteCountry(deleteCountryBody: DeleteCountryBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteCountry, JSON.stringify(deleteCountryBody), this.httpOptions);
  }
  getStates(universalBody: UniversalBody): Observable<GetStateResponse> {
    return this.httpClient.post<GetStateResponse>(ServiceUrls.baseUrls + ServiceUrls.getState, JSON.stringify(universalBody), this.httpOptions);
  }
  getCity(universalBody: UniversalBody): Observable<GetCityResponse> {
    return this.httpClient.post<GetCityResponse>(ServiceUrls.baseUrls + ServiceUrls.getCity, JSON.stringify(universalBody), this.httpOptions);
  }
  saveHighSchool(highSchool: HighSchoolBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.highSchoolApi, JSON.stringify(highSchool), this.httpOptions);
  }
  getHighSchoolData(getSchoolModel: GetSchoolModel): Observable<GetSchoolDataResponse[]> {
    return this.httpClient.post<GetSchoolDataResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getSchoolDataApi, JSON.stringify(getSchoolModel), this.httpOptions);
  }
  getPostal(universalBody: UniversalBody): Observable<GetPostalResponse> {
    return this.httpClient.post<GetPostalResponse>(ServiceUrls.baseUrls + ServiceUrls.getPostal, JSON.stringify(universalBody), this.httpOptions);
  }
  deleteState(deleteStateBody: DeleteStateBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteState, JSON.stringify(deleteStateBody), this.httpOptions);
  }
  deleteCity(deleteCityBody: DeleteCityBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteCity, JSON.stringify(deleteCityBody), this.httpOptions);
  }
  deletePostal(deletePostalBody: DeletePostalBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.deletePostal, JSON.stringify(deletePostalBody), this.httpOptions);
  }

}
