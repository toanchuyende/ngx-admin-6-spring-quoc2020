import { ExtraOptions, RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { NgModule } from "@angular/core";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from "@nebular/auth";
import { AuthGuardService } from './auth-guard.service';

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "management",
    canActivate: [AuthGuardService], // here we tell Angular to check the access with our AuthGuard
    loadChildren: () =>
      import("./management/management.module").then((m) => m.ManagementModule),
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  // {
  //   path: 'auth',
  //   loadChildren: './auth/auth.module#AuthModule',
  // },
  // *** Viết theo cú pháp mới tiện quản trị module hơn
  // *** Viết theo cú pháp mới tiện quản trị module hơn
  // *** Viết theo cú pháp mới tiện quản trị module hơn

  { path: "", redirectTo: "management", pathMatch: "full" },
  { path: "**", redirectTo: "management" },
];

const config: ExtraOptions = {
  useHash: true, preloadingStrategy: PreloadAllModules
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
