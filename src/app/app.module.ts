/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { ThemeModule } from "./@theme/theme.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from "@nebular/theme";
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
} from "@nebular/auth";
import { NbRoleProvider, NbSecurityModule } from "@nebular/security";
import { of as observableOf } from "rxjs/observable/of";
import { RoleService } from "./auth/role.service";
import { AgileChatComponent } from "./pages/agile-chat/agile-chat.component";
import { ManagementComponent } from "./management/management.component";
import { ManagementModule } from "./management/management.module";
import { AuthGuardService } from './auth-guard.service';
import { AgileCacheCommonService } from './agile-cache-common.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: "AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY",
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: "email",
          baseEndpoint: "http://auth.kenhthongtinsinhvien.com",
          login: {
            endpoint: "/api/auth/signin-nebular",
          },
          register: {
            endpoint: "/api/auth/signup-nebular",
          },
          // logout: {
          //   endpoint: '/auth/sign-out',
          // },
          // requestPass: {
          //   endpoint: '/auth/request-pass',
          // },
          // resetPass: {
          //   endpoint: '/auth/reset-pass',
          // },
          token: {
            class: NbAuthJWTToken,
            key: "accessToken", // this parameter tells where to look for the token
          },
        }),
      ],
      forms: {},
    }),
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ["news", "comments"],
        },
        ROLE_USER: {
          parent: "guest",
          create: "comments",
          view: ["user"],
        },
        ROLE_MODERATOR: {
          parent: "ROLE_USER",
          create: "news",
          remove: "*",
        },
      },
    }),
  ],
  providers: [
    AuthGuardService, AgileCacheCommonService,
    { provide: NbRoleProvider, useClass: RoleService }, // provide the class
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
