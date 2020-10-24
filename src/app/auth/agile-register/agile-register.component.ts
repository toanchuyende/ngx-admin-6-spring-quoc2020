import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  getDeepFromObject,
  NbAuthResult,
  NbAuthService,
  NbAuthSocialLink,
  NbRegisterComponent,
  NB_AUTH_OPTIONS,
} from "@nebular/auth";

@Component({
  selector: "ngx-agile-register",
  templateUrl: "./agile-register.component.html",
  styleUrls: ["./agile-register.component.scss"],
})
export class AgileRegisterComponent {
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = "";

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  socialLinks: NbAuthSocialLink[] = [];

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {
    this.redirectDelay = this.getConfigValue("forms.register.redirectDelay");
    this.showMessages = this.getConfigValue("forms.register.showMessages");
    this.strategy = this.getConfigValue("forms.register.strategy");
    this.socialLinks = this.getConfigValue("forms.login.socialLinks");
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;
debugger;
    this.service
      .register(this.strategy, this.user)
      .subscribe((result: NbAuthResult) => {
        this.submitted = false;
        if (result.isSuccess()) {
          this.messages = result.getMessages();
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
