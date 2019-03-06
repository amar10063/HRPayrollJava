import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
const routes: Routes = [
{ path: '', redirectTo: '/signup', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'login', component: LoginComponent},
{ path: 'signup', component: SignupComponent },
{ path: 'forgetpassword', component: ForgetpasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
