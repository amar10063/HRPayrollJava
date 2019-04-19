import { NgModel } from '@angular/forms';

export class  EmployeeExperienceResponse  //extends NgModel
{
    id: number;
    location: string;
    companyName: string;
    department: string;
    designation: string;
    experience: string;
    exitDate: string;
    joiningDate: string;
}
