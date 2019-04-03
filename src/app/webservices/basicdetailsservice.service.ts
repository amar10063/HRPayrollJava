import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from './Urls';
import { BasicDetails } from '../HRPayroll/employee/BasicDetails';
import { BasicDetailsResponse } from '../HRPayroll/employee/BasicDetailsResponse';

import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicdetailsserviceService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  doSave(basicDetails: BasicDetails): Observable<any> {
    return this.httpClient.post<any>(Urls.baseUrls + Urls.basicDetails, JSON.stringify(basicDetails), this.httpOptions);
  }
}



