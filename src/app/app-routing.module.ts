import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { EmployeeComponent } from './HRPayroll/employee/employee.component';
import { HrmoduleComponent } from './HRPayroll/hrmodule/hrmodule.component';
import { SelfServiceComponent } from './self-service/self-service.component';
import { SystemAdminModuleComponent } from './SystemAdministration/SystemAdminModule/SystemAdminModule.component';
import { CountryComponent } from './SystemAdministration/country/country.component';
import { SetupComponent } from './HRPayroll/setup/setup.component';


const routes: Routes = [
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'login', component: LoginComponent},
{ path: 'forgetpassword', component: ForgetpasswordComponent },
{ path: 'employee', component: EmployeeComponent },
{ path: 'hrmodule', component: HrmoduleComponent },
{ path: 'self-service', component: SelfServiceComponent },
{ path: 'system-administration', component: SystemAdminModuleComponent },
{ path: 'country', component: CountryComponent },
{ path: 'Setup', component: SetupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
