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
import { GetCountryResponse } from './WebServiceResponse/CountryResponse/GetCountryResponse';
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
import { SchoolDeleted } from './WebServiceBody/EducationBody/SchoolDeleted';
import { GraduationBody } from './WebServiceBody/EducationBody/GraduationBody';
import { GraduationDeleted } from './WebServiceBody/EducationBody/GraduationDeleted';
import { GetGraduationDetailsResponse } from '../HRPayroll/Education/GetGraduationDetailsResponse';
import { GetPostGraduationDetailsResponse } from '../HRPayroll/Education/GetPostGraduationDetailsResponse';
import { PostGradutationBody } from './WebServiceBody/EducationBody/PostGradutationBody';
import { PostGraduationDeleted } from './WebServiceBody/EducationBody/PostGraduationDeleted';
import { GetOtherEducationalResponse } from '../HRPayroll/Education/GetOtherEducationalResponse';
import { OtherEducationBody } from './WebServiceBody/EducationBody/OtherEducationBody';
import { OtherEducationDeleted } from './WebServiceBody/EducationBody/OtherEducationDeleted';
import { UpdateStateBody } from './WebServiceBody/CountryBody/UpadateStateBody';
import { UpdateCountryBody } from './WebServiceBody/CountryBody/UpdateCountryBody';
import { UpdateCityBody } from './WebServiceBody/CountryBody/UpdateCityBody';
import { UpdatePostalBody } from './WebServiceBody/CountryBody/UpdatePostalBody';
import { BasicDetailBody } from './WebServiceBody/EmployeeBasicDetail/BasicDetailBody';
import { GetProfessionalEducationResponse } from '../HRPayroll/ProfessionalEducation/GetProfessionalEducationResponse';
import { DeletedProfessionalEducation } from './WebServiceBody/ProfessionalEducation/deletedProfessionalEducation';
import { ProfessionalBodyUpdate } from './WebServiceBody/ProfessionalEducation/ProfessionalBodyUpdate';
import { ProfessionalBodySave } from './WebServiceBody/ProfessionalEducation/ProfessionalBodySave';

import { EmployeeAddressBody } from './WebServiceBody/EmployeeAddressBody/EmployeeAddressBody';
import { EmployeeAddressResponse } from './WebServiceResponse/EmployeeAddressResponse/EmployeeAddressResponse';
import { DeleteEmployeeAddressBody } from './WebServiceBody/EmployeeAddressBody/DeleteEmployeeAddressBody';
import { EmployeeExperienceBody } from './WebServiceBody/EmployeeExperienceBody/EmployeeExperienceBody';
import { EmployeeExperienceResponse } from './WebServiceResponse/EmployeeExperienceRespone/EmployeeExperienceResponse';
import {  DeleteEmployeeExperienceBody } from './WebServiceBody/EmployeeExperienceBody/DeleteEmployeeExperienceBody';
import { UpdateEmployeeExperienceBody } from './WebServiceBody/EmployeeExperienceBody/UpdateEmployeeExperienceBody';
import { UpdateEmployeeAddressBody } from './WebServiceBody/EmployeeAddressBody/UpdateEmployeeAddressBody';
import { SkillBody } from './WebServiceBody/SkillsBody/SkillBody';
import { SkillResponse } from './WebServiceResponse/SkillResponse/SkillResponse';
import { AchievementBody } from './WebServiceBody/AchievementBody/AchievementBody';
import { AchievementResponse } from './WebServiceResponse/AchievementResponse/AchievementResponse';
import { UpdateAchievementBody } from './WebServiceBody/AchievementBody/UpdateAchievementBody';
import { DeleteAchievementBody } from './WebServiceBody/AchievementBody/DeleteAchievementBody';
import { UniversalJsonBody } from './WebServiceBody/UniversalJsonBody';
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
  saveCountry(countryJsonBody: UniversalJsonBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.saveCountry, JSON.stringify(countryJsonBody), this.httpOptions);
  }
  saveEmpolyeeAddress(employeeAddressBody: EmployeeAddressBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.saveEmployeeAddress, JSON.stringify(employeeAddressBody), this.httpOptions);
  }

  saveEmpExperience(employeeExperienceBody: EmployeeExperienceBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.saveEmpExperience, JSON.stringify(employeeExperienceBody), this.httpOptions);
  }
  getEmpolyeeExperience(universalBody: UniversalBody): Observable<EmployeeExperienceResponse[]> {
    return this.httpClient.post<EmployeeExperienceResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getEmpExperience, JSON.stringify(universalBody), this.httpOptions);
  }
  updateEmpExperience(updateEmployeeExperienceBody: UpdateEmployeeExperienceBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.updateEmpExperience, JSON.stringify(updateEmployeeExperienceBody), this.httpOptions);
  }
  deleteEmpExperience(deleteEmployeeExperienceBody: DeleteEmployeeExperienceBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteEmpExperience, JSON.stringify(deleteEmployeeExperienceBody), this.httpOptions);
  }
  getEmpolyeeAddress(universalBody: UniversalBody): Observable<EmployeeAddressResponse[]> {
    return this.httpClient.post<EmployeeAddressResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getEmployeeAddress, JSON.stringify(universalBody), this.httpOptions);
  }
  deleteEmpolyeeAddress(deleteEmployeeAddressBody: DeleteEmployeeAddressBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteEmployeeAddress, JSON.stringify(deleteEmployeeAddressBody), this.httpOptions);
  }
  updateEmployeeAddress(updateEmployeeAddressBody: UpdateEmployeeAddressBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.updateEmployeeAddress, JSON.stringify(updateEmployeeAddressBody), this.httpOptions);
  }
  saveEmployeeBasicDetail(basicDetailBody: BasicDetailBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.saveEmployeeBasicDetail, JSON.stringify(basicDetailBody), this.httpOptions);
  }

  saveLocation(jsonData: UniversalJsonBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.AddLocation, JSON.stringify(jsonData), this.httpOptions);
  }

  doGetLocation(getLocationBody: UniversalBody): Observable<GetAllLocationResponse[]> {
    console.log("Message",getLocationBody);
    return this.httpClient.post<GetAllLocationResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getLocation, JSON.stringify(getLocationBody), this.httpOptions);
  }
  getLocationDropDown(getLocationBody: UniversalBody): Observable<GetAllLocationResponse[]> {
    console.log("Message",getLocationBody);
    return this.httpClient.post<GetAllLocationResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getLocationDropDown, JSON.stringify(getLocationBody), this.httpOptions);
  }
  getDepartmentDropDown(getLocationBody: UniversalBody): Observable<GetAllLocationResponse[]> {
    console.log("Message",getLocationBody);
    return this.httpClient.post<GetAllLocationResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getDepartmentDropDown, JSON.stringify(getLocationBody), this.httpOptions);
  }
  updateLocation(jsonData: UniversalJsonBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.UpdateLocation, JSON.stringify(jsonData), this.httpOptions);
  }
  getDepartment(departmentBody: GetAllDepartmentBody): Observable<GetAllLocationResponse[]> {
    return this.httpClient.post<GetAllLocationResponse[]>('http://10.10.10.48:8081' + '/getDepartment', JSON.stringify(departmentBody), this.httpOptions);
  }
  getDepartmentByUserId(getDepartmentBody: UniversalBody): Observable<GetDepartmentResponse[]> {
    return this.httpClient.post<GetDepartmentResponse[]>('http://10.10.10.48:8081' + '/getDeptByUser', JSON.stringify(getDepartmentBody), this.httpOptions);
  }

  doDeleteLocation(jsonData: UniversalJsonBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.DeleteLocation, JSON.stringify(jsonData), this.httpOptions);
  }

  saveDepartment(universalJsonBody: UniversalJsonBody): Observable<any> {
    alert(JSON.stringify(universalJsonBody));
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.AddDepartment, JSON.stringify(universalJsonBody), this.httpOptions);
  }
  deleteDepartment(universalJsonBody: UniversalJsonBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.DeleteDepartment, JSON.stringify(universalJsonBody), this.httpOptions);
  }

  updateDepartment(universalJsonBody: UniversalJsonBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls+ ServiceUrls.updateDepartment, JSON.stringify(universalJsonBody), this.httpOptions);
  }

  saveDesignation(jsonData: UniversalJsonBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.AddDesignation, JSON.stringify(jsonData), this.httpOptions);
  }

  deleteDesignation(deleteDesignationBody: UniversalJsonBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.DeleteDesignation, JSON.stringify(deleteDesignationBody), this.httpOptions);
  }
  getAllDesignation(designationBody: GetAllDesignationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.getAllDesignation, JSON.stringify(designationBody), this.httpOptions);
  }
  getDesignationByUserId(getDesignationBody: UniversalBody): Observable<GetDesignationResponse[]> {
    return this.httpClient.post<GetDesignationResponse[]>('http://10.10.10.48:8081' + '/getDesignationDataByUser', JSON.stringify(getDesignationBody), this.httpOptions);
  }
  updateDesignation(updateDesignationBody: UniversalJsonBody): Observable<UniversalResponse> {
    console.log("update checking", updateDesignationBody);
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.updateDesignation, JSON.stringify(updateDesignationBody), this.httpOptions);
  }
  saveCity(universalJsonBody: UniversalJsonBody): Observable<UniversalResponse> {
    //alert(JSON.stringify(universalJsonBody));
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.saveCity, JSON.stringify(universalJsonBody), this.httpOptions);
  }
  saveState(universalJsonBody: UniversalJsonBody): Observable<UniversalResponse> {
    alert(universalJsonBody.jsonData);
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.saveState, JSON.stringify(universalJsonBody), this.httpOptions);
  }
  getCountries(universalBody: UniversalBody): Observable<GetCountryResponse[]> {
    return this.httpClient.post<GetCountryResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getCountry, JSON.stringify(universalBody), this.httpOptions);
  }
  savePostal(universalJsonBody: UniversalJsonBody): Observable<UniversalResponse> {
    console.log("json checking", universalJsonBody);
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.savePostal, JSON.stringify(universalJsonBody), this.httpOptions);
  }
  deleteCountry(universalJsonBody: UniversalJsonBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteCountry, JSON.stringify(universalJsonBody), this.httpOptions);
  }
  getStates(universalBody: UniversalBody): Observable<GetStateResponse[]> {
    return this.httpClient.post<GetStateResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getState, JSON.stringify(universalBody), this.httpOptions);
  }
  getCity(universalBody: UniversalBody): Observable<GetCityResponse[]> {
    return this.httpClient.post<GetCityResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getCity, JSON.stringify(universalBody), this.httpOptions);
  }
  saveHighSchool(highSchool: HighSchoolBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.highSchoolApi, JSON.stringify(highSchool), this.httpOptions);
  }

  getHighSchoolData(getSchoolModel: GetSchoolModel): Observable<GetSchoolDataResponse[]> {
    return this.httpClient.post<GetSchoolDataResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getSchoolDataApi, JSON.stringify(getSchoolModel), this.httpOptions);
  }

  deleteSchool(deletedSchool: SchoolDeleted): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteSchool, JSON.stringify(deletedSchool), this.httpOptions);
  }

  saveGraduation(graduationBody: GraduationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.graduationAdd, JSON.stringify(graduationBody), this.httpOptions);
  }

  getgraduational(getSchoolModel: GetSchoolModel): Observable<GetGraduationDetailsResponse[]> {
    return this.httpClient.post<GetGraduationDetailsResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getgraduationDetails, JSON.stringify(getSchoolModel), this.httpOptions);
  }

  deleteGraduational(deletedGRADUATION: GraduationDeleted): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.getgraduationdDelete, JSON.stringify(deletedGRADUATION), this.httpOptions);
  }

  getPostgraduational(getSchoolModel: GetSchoolModel): Observable<GetPostGraduationDetailsResponse[]> {
    return this.httpClient.post<GetPostGraduationDetailsResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getPostGraduationData, JSON.stringify(getSchoolModel), this.httpOptions);
  }

  savePostGraduation(postGraduationBody: PostGradutationBody): Observable<any> {
    console.log('Data sending', postGraduationBody);
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.PostGraduationAdd, JSON.stringify(postGraduationBody), this.httpOptions);
  }

  deletePostGraduational(deletedPostGRADUATION: PostGraduationDeleted): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.getPostGraduationdDelete, JSON.stringify(deletedPostGRADUATION), this.httpOptions);
  }

  getOtherEducation(getSchoolModel: GetSchoolModel): Observable<GetOtherEducationalResponse[]> {
    return this.httpClient.post<GetOtherEducationalResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getOtherEducation, JSON.stringify(getSchoolModel), this.httpOptions);
  }

  saveOtherEducation(otherPostEducation: OtherEducationBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.OtherEducationAdd, JSON.stringify(otherPostEducation), this.httpOptions);
  }

  deleteOtherEducation(otherEducationDeleted: OtherEducationDeleted): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.OtherEducationDeleted, JSON.stringify(otherEducationDeleted), this.httpOptions);
  }

  getProfessionalEducation(getSchoolModel: GetSchoolModel): Observable<GetProfessionalEducationResponse[]> {
    return this.httpClient.post<GetProfessionalEducationResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getProfessionalEducation, JSON.stringify(getSchoolModel), this.httpOptions);
  }

  saveProfessionalEducation(ProfessionalBodySave: ProfessionalBodySave): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.saveProfessionalEducation, JSON.stringify(ProfessionalBodySave), this.httpOptions);
  }

  updateProfessionalEducation(professionalBodyUpdate: ProfessionalBodyUpdate): Observable<any> {
    console.log("Keyssss",professionalBodyUpdate);
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.updateProfessionalEducation, JSON.stringify(professionalBodyUpdate), this.httpOptions);
  }

  deleteProfessionalEducation(deletedProfessionalEducation: DeletedProfessionalEducation): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteProfessionQualification, JSON.stringify(deletedProfessionalEducation), this.httpOptions);
  }

  getPostal(universalBody: UniversalBody): Observable<GetPostalResponse[]> {
    return this.httpClient.post<GetPostalResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getPostal, JSON.stringify(universalBody), this.httpOptions);
  }

  deleteState(universalJsonBody: UniversalJsonBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.deleteState, JSON.stringify(universalJsonBody), this.httpOptions);
  }

  deleteCity(universalJsonBody: UniversalJsonBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteCity, JSON.stringify(universalJsonBody), this.httpOptions);
  }
  deletePostal(universalJsonBody: UniversalJsonBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.deletePostal, JSON.stringify(universalJsonBody), this.httpOptions);
  }

  updateState(updateStateBody: UniversalJsonBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.UpdateMultipleState, JSON.stringify(updateStateBody), this.httpOptions);
  }
  updateCountry(updateCountryBody: UniversalJsonBody): Observable<UniversalResponse> {
   // console.log("jsondata : ",updateCountryBody);
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.updateCountry, JSON.stringify(updateCountryBody), this.httpOptions);
  }
  updateCity(universalJsonBody: UniversalJsonBody): Observable<UniversalResponse> {
    alert(JSON.stringify(universalJsonBody));
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.updateCity, JSON.stringify(universalJsonBody), this.httpOptions);
  }
  updatePostal(updatePostalBody: UniversalJsonBody): Observable<UniversalResponse> {
    console.log("jsondata in web service: ",updatePostalBody);
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.updatePostal, JSON.stringify(updatePostalBody), this.httpOptions);
  }
  countryDropdown(universalBody: UniversalBody): Observable<GetAllLocationResponse[]> {
    return this.httpClient.post<GetAllLocationResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getCountryDropDown, JSON.stringify(universalBody), this.httpOptions);
  }
  stateDropdown(universalBody: UniversalBody): Observable<GetAllLocationResponse[]> {
    return this.httpClient.post<GetAllLocationResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getStateDropdown, JSON.stringify(universalBody), this.httpOptions);
  }
  cityDropdown(universalBody: UniversalBody): Observable<GetAllLocationResponse[]> {
    return this.httpClient.post<GetAllLocationResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getCityDropdown, JSON.stringify(universalBody), this.httpOptions);
  }



  saveSkills(skillBody: SkillBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.addSkills, JSON.stringify(skillBody), this.httpOptions);
  }
  getSkills(universalBody: UniversalBody): Observable<SkillResponse[]> {
    return this.httpClient.post<SkillResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getSkillsData, JSON.stringify(universalBody), this.httpOptions);
  }
  saveAchievement(achievementBody: AchievementBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.addAchievements, JSON.stringify(achievementBody), this.httpOptions);
  }
  getAchievement(universalBody: UniversalBody): Observable<AchievementResponse[]> {
    return this.httpClient.post<AchievementResponse[]>(ServiceUrls.baseUrls + ServiceUrls.getAchievement, JSON.stringify(universalBody), this.httpOptions);
  }
  updateAchievement(updateAchievementBody: UpdateAchievementBody): Observable<any> {
    return this.httpClient.post<any>(ServiceUrls.baseUrls + ServiceUrls.updateAchievements, JSON.stringify(updateAchievementBody), this.httpOptions);
  }
  deleteAchievement(deleteAchievementBody: DeleteAchievementBody): Observable<UniversalResponse> {
    return this.httpClient.post<UniversalResponse>(ServiceUrls.baseUrls + ServiceUrls.deleteAchievements, JSON.stringify(deleteAchievementBody), this.httpOptions);
  }
}
