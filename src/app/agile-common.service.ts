import { Injectable } from "@angular/core";
import { NbAuthService } from '@nebular/auth';
import { AgileMethod } from "./agile-method.enum";
import { RoleService } from './auth/role.service';

@Injectable({
  providedIn: "root",
})
export class AgileCommonService {
  constructor() {}

  static executeMethod(method: AgileMethod,
    ) {
    switch (method) {
      case AgileMethod.LOGOUT:
        RoleService.logout();
        break;
      default:
    }
  }
}
