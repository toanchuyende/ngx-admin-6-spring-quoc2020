import { LocationStrategy } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { AgileCacheCommonService } from "app/agile-cache-common.service";
import { RoleService } from "app/auth/role.service";
import { DataConversation } from "app/models/data-conversation";
import { CrudConversationService } from "../crud-conversation.service";

@Component({
  selector: "agile-crud-conversation-create",
  templateUrl: "./crud-conversation-create.component.html",
  styleUrls: ["./crud-conversation-create.component.scss"],
})
export class CrudConversationCreateComponent
  implements OnInit, AfterViewInit, OnDestroy {
  currentItem: DataConversation;
  constructor(
    private __CrudConversationService: CrudConversationService,
    private toastrService: NbToastrService,
    private roleService: RoleService,
    private host: ElementRef,
    private locationStrategy: LocationStrategy
  ) {
    this.initUI();
  }

  initUI() {}
  ngOnInit(): void {

    this.currentItem = new DataConversation();
  }

  ngAfterViewInit() {

  }
  ngOnDestroy() {

  }
  save(event) {
    let tempData = this.currentItem as DataConversation;
    if (AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared) {
      tempData.members = [];
      tempData.members.push(
        AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared.id
      );
    }


    this.__CrudConversationService.create(tempData).subscribe((data) => {
      if (data) {
        this.currentItem = data;
        this.showToast(
          "bottom-left",
          "success",
          `Đã tạo mới thành công: ${this.currentItem.title}`
        );
        // https://akveo.github.io/nebular/docs/components/toastr/overview#nbtoastrservice
      }
    });
  }

  showToast(position, status, text) {
    // this.index += 1;
    this.toastrService.show(status || "Success", `${text}`, {
      position,
      status,
    });
  }
}
