/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AgileCacheCommonService } from "app/agile-cache-common.service";
import { AgileCacheData } from "app/agile-cache-data";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

// if (environment.production) {
//   enableProdMode();
// }

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

var _ = require("lodash");

(async () => {
  // LOAD CACHE DATA

  try {
    let __temp_AGILE_CACHE_DATA = localStorage.getItem("AGILE_CACHE_DATA");

    if (_.isNil(__temp_AGILE_CACHE_DATA)) {
      AgileCacheCommonService._AGILE_CACHE_DATA = new AgileCacheData();
      // return false;
    } else {
      AgileCacheCommonService._AGILE_CACHE_DATA = JSON.parse(
        __temp_AGILE_CACHE_DATA
      );
    }

    if (environment.production) {
      enableProdMode();
    }

    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  } catch (eX) {
    console.error("App run ERROR:", eX);
  }
})();
