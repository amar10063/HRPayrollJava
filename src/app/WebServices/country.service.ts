import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceUrls } from './ServiceUrls';
import { Injectable } from '@angular/core';
import { CountryBody } from '../SystemAdministration/country/CountryBody';
import { HighSchoolModel } from '../HRPayroll/Education/HighSchoolModel';

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

  doHighSchoolSave(highSchool: HighSchoolModel): Observable<any> { 
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.highSchoolApi, JSON.stringify(highSchool), this.httpOptions);
  }

  doGetHighSchoolData(): Observable<any> { 
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.getSchoolDataApi, this.httpOptions);
  }
  
}


