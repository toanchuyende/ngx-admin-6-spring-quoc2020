import { NgModule } from "@angular/core";
import { NbChatModule, NbMenuModule } from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ECommerceModule } from "./e-commerce/e-commerce.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { AgileChatComponent } from "./agile-chat/agile-chat.component";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    NbChatModule,
    MiscellaneousModule,
  ],
  declarations: [PagesComponent, AgileChatComponent],
  exports: [AgileChatComponent],
})
export class PagesModule {}
