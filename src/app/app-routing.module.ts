import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { EmployeeComponent } from './HRPayroll/employee/employee.component';
const routes: Routes = [
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'login', component: LoginComponent},
{ path: 'forgetpassword', component: ForgetpasswordComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'employee', component: EmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
