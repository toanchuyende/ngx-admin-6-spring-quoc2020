import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbAuthComponent, NbLogoutComponent, NbRegisterComponent, NbRequestPasswordComponent, NbResetPasswordComponent } from '@nebular/auth';
import { AgileRegisterComponent } from './agile-register/agile-register.component';
import { AgileViewMyProfileComponent } from './agile-view-my-profile/agile-view-my-profile.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'view-my-profile',
        component: AgileViewMyProfileComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: AgileRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
