import { Component, Inject, OnInit } from "@angular/core";
import { getDeepFromObject, NB_AUTH_OPTIONS } from "@nebular/auth";
import { UserData } from "app/@core/data/users";
import { AgileCacheCommonService } from "app/agile-cache-common.service";

@Component({
  selector: "agile-agile-view-my-profile",
  templateUrl: "./agile-view-my-profile.component.html",
  styleUrls: ["./agile-view-my-profile.component.scss"],
})
export class AgileViewMyProfileComponent implements OnInit {
  currentUser: UserData;
  user: any = {};

  constructor(@Inject(NB_AUTH_OPTIONS) protected options = {}) {}

  ngOnInit(): void {
    if (!AgileCacheCommonService._AGILE_CACHE_DATA.isLoggedShared) {
      return;
    }

    this.user =
      AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared;
  }
  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
