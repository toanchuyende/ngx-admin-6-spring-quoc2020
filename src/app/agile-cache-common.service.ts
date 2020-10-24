import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AgileCacheData } from "./agile-cache-data";
import { RoleService } from "./auth/role.service";
// Load the full build.
var _ = require("lodash");

@Injectable({
  providedIn: "root",
})
export class AgileCacheCommonService {
  constructor() {}

  // @ts-ignore
  static _AGILE_CACHE_DATA: AgileCacheData = null;

  static SAVE_AGILE_CACHE_USER_LOGIN(loginUser: any) {
    // LOAD CACHE DATA


    try {
      // _AGILE_CACHE_DATA = localStorage.getItem("AGILE_CACHE_DATA");

      AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared = loginUser;
      AgileCacheCommonService.SAVE_AGILE_CACHE_DATA();
    } catch (eX) {
      console.error("SAVE_AGILE_CACHE_USER_LOGIN run ERROR:", eX);
    }
  }

  static SAVE_AGILE_CACHE_DATA() {
    // LOAD CACHE DATA


    try {
      // _AGILE_CACHE_DATA = localStorage.getItem("AGILE_CACHE_DATA");

      localStorage.setItem(
        "AGILE_CACHE_DATA",
        JSON.stringify(AgileCacheCommonService._AGILE_CACHE_DATA)
      );
    } catch (eX) {
      console.error("SAVE_AGILE_CACHE_DATA run ERROR:", eX);
    }
  }

  static CLEAR_AGILE_CACHE_USER_LOGIN() {
    // LOAD CACHE DATA


    try {
      AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared = null;

      localStorage.removeItem("auth_app_token");

      AgileCacheCommonService.SAVE_AGILE_CACHE_DATA();
    } catch (eX) {
      console.error("CLEAR_AGILE_CACHE_USER_LOGIN run ERROR:", eX);
    }
  }

  public loadCacheUser(): boolean {
    // LOAD CACHE DATA


    try {
      // RoleServiAgileCacheCommonService._AGILE_CACHE_DATAce.userLoggedShared =
      //   AgileCacheCommonService._AGILE_CACHE_DATA?.userLoggedShared;
      return true;
    } catch (eX) {
      console.error("SAVE_AGILE_CACHE_DATA run ERROR:", eX);
      return false;
    }
  }
}
