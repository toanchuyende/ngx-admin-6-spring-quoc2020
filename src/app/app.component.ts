/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AnalyticsService } from "./@core/utils/analytics.service";
import { SeoService } from "./@core/utils/seo.service";
import { AgileCacheCommonService } from "./agile-cache-common.service";
import { RoleService } from "./auth/role.service";

@Component({
  selector: "ngx-app",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private agileCacheCommonService: AgileCacheCommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    if (this.agileCacheCommonService.loadCacheUser()) {

    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }
}
