import { Component, Inject, OnInit } from "@angular/core";

import {
  getDeepFromObject,
  NbAuthResult,
  NbAuthService,
  NbAuthSocialLink,
  NbLoginComponent,
  NB_AUTH_OPTIONS,
} from "@nebular/auth";

import { ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { RoleService } from "../role.service";

// https://github.com/akveo/nebular/blob/master/src/framework/auth/components/login/login.component.ts
@Component({
  selector: "agile-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends NbLoginComponent {
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = "";

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private roleService: RoleService
  ) {
    super(service, options, cd, router);

    this.redirectDelay = this.getConfigValue("forms.login.redirectDelay");
    this.showMessages = this.getConfigValue("forms.login.showMessages");
    this.strategy = this.getConfigValue("forms.login.strategy");
    this.socialLinks = this.getConfigValue("forms.login.socialLinks");
    this.rememberMe = this.getConfigValue("forms.login.rememberMe");
  }

  login(): void {
    console.debug("login ", this.user);
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service
      .authenticate(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;
        //
        if (result.isSuccess()) {

          this.messages = result.getMessages();
          this.roleService.setUser(result);
        } else {
          this.errors = result.getErrors();
        }

        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
        this.cd.detectChanges();
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
