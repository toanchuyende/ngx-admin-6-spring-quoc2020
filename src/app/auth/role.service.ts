import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";

import { NbAuthService, NbAuthJWTToken } from "@nebular/auth";
import { NbRoleProvider } from "@nebular/security";
import { of as observableOf } from "rxjs/observable/of";
import { filter } from "rxjs/operators";
import { AgileCacheCommonService } from "app/agile-cache-common.service";
@Injectable({
  providedIn: "root",
})
export class RoleService implements NbRoleProvider {
  constructor(private authService: NbAuthService) {}
  // getRole(): Observable<string> {
  //   return this.authService.onTokenChange().pipe(
  //     map((token: NbAuthJWTToken) => {
  //
  //       return token.isValid() ? token.getPayload()["role"] : "guest";
  //     })
  //   );
  // }

  getRole(): Observable<string> {
    return new Observable((subscriber) => {
      this.onUserLoginChange().subscribe((data) => {
        this.userLoggedChat = AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared;

        let roles = AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared
          ? AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared["roles"]
          : "guest";

        let finalRole = "guest";

        for (let role of roles) {
          if (role == "ROLE_USER") {
            finalRole = role;
          }
          if (role == "ROLE_MODERATOR") {
            finalRole = role;
            break;
          }
        }

        subscriber.next(finalRole);
        subscriber.complete();
      });
    });

    // return this.onUserLoginChange().pipe(
    //   map((data) => {
    //
    //     return data ? this.userLogged["roles"] : "guest";
    //   }),
    //   filter((events) => events !== undefined)
    // );
  }
  // static userLoggedShared: any;
  // static isLoggedShared: boolean = false;

  public userLogged: any;
  public userLoggedChat: any;

  setUser(userLogged: any) {



    let _token = userLogged?.getToken();

    AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared = userLogged?.response?.body;
    this.userLogged = userLogged?.response?.body;
    // AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared = this.userLogged;
    AgileCacheCommonService._AGILE_CACHE_DATA.isLoggedShared = true;

    AgileCacheCommonService.SAVE_AGILE_CACHE_USER_LOGIN(
      AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared
    );
  }

  onUserLoginChange(): Observable<any> {
    return observableOf(this.userLogged);
  }

  onUserLoginChatChange(): Observable<any> {
    return observableOf(this.userLoggedChat);
  }

  static logout() {
    AgileCacheCommonService.CLEAR_AGILE_CACHE_USER_LOGIN();
    location.href = "/";
  }
}
