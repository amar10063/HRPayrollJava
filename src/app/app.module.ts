import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeComponent } from './HRPayroll/employee/employee.component';
import { HrmoduleComponent } from './HRPayroll/hrmodule/hrmodule.component';
import { FinanceComponent } from './HRPayroll/finance/finance.component';
import { SelfServiceComponent } from './self-service/self-service.component';
import { CountryComponent } from './SystemAdministration/country/country.component';
import { SetupComponent } from './HRPayroll/setup/setup.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { XhrInterceptor } from './XhrInterceptor';
import { OrganizationComponent } from './SystemAdministration/organization/organization.component';
import { PayrollComponent } from './SystemAdministration/payroll/payroll.component';
import { TaxComponent } from './SystemAdministration/tax/tax.component';
import { GeneralComponent } from './SystemAdministration/general/general.component';


import { DropdownComponent } from './dropdown/dropdown.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AaratiComponent } from './aarati/aarati.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ForgetpasswordComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    EmployeeComponent,
    HrmoduleComponent,
    FinanceComponent,
    SelfServiceComponent,
    CountryComponent,
    SetupComponent,
    GlobalSearchComponent,
    OrganizationComponent,
    PayrollComponent,
    TaxComponent,

    GeneralComponent,
    DropdownComponent,
    AaratiComponent


  ],
  imports: [
    AgGridModule.withComponents([]),
    BrowserModule, ReactiveFormsModule, FormsModule,
    AppRoutingModule, HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
