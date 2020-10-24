import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuBag,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { UserData } from "../../../@core/data/users";
import { LayoutService } from "../../../@core/utils";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";
import { RoleService } from "app/auth/role.service";
import { NbAccessChecker } from "@nebular/security";
import { AgileMethod } from "app/agile-method.enum";
import { AgileCommonService } from "app/agile-common.service";
import { AgileCacheCommonService } from 'app/agile-cache-common.service';

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  __username: string = "";
  __isLoggedShared: boolean = false;
  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];

  currentTheme = "default";

  userMenu = [
    { title: "Profile", link: "/auth/view-my-profile" },
    { title: "chat", link: "/management/chat" },
    // { title: "chat", link: "/management/chat" },
    // view-my-profile
    {
      title: "Log out",
      link: "/management/chat",
      agileMethod: AgileMethod.LOGOUT,
    },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: NbAuthService,
    private roleService: RoleService,
    public accessChecker: NbAccessChecker
  ) {
    // this.authService.onTokenChange()
    // .subscribe((token: NbAuthJWTToken) => {

    //   if (token.isValid()) {
    //     //
    //     this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
    //   }

    // });

    this.menuService.onItemClick().subscribe((itemClicked: NbMenuBag) => {

      // @ts-ignore
      if (_.isNil(itemClicked?.item?.agileMethod)) {
        return;
      }

      // @ts-ignore
      this.executeMethod(itemClicked?.item?.agileMethod);
    });

    this.roleService.onUserLoginChange().subscribe((userLogged: any) => {
      if (AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared) {
        this.user = AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared;
        console.debug("this.user: ", this.user);
        this.__username = this.user["username"];
        this.__isLoggedShared = true;
      }
    });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    // this.changeTheme("dark");
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => (this.user = users.nick));

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  executeMethod(method: AgileMethod) {
    switch (method) {
      case AgileMethod.LOGOUT:
        AgileCommonService.executeMethod(method);
        this.authService.logout("email");
        break;
      default:
    }
  }
}
