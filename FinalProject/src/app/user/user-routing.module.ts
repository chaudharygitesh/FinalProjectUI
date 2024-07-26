import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailCheckComponent } from './email-check/email-check.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path : 'abc' ,component:LoginComponent},
  {path : 'Forget' ,component:ForgotPasswordComponent},
  {path:'EmailCheck',component:EmailCheckComponent},
  {path:'Register',component:RegisterComponent},
  {path:'',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class userRoutingModule { }
