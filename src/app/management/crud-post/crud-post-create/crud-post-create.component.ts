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
import { DataPost } from "app/models/data-post";
import { CrudPostService } from "../crud-post.service";

@Component({
  selector: "agile-crud-post-create",
  templateUrl: "./crud-post-create.component.html",
  styleUrls: ["./crud-post-create.component.scss"],
})
export class CrudPostCreateComponent
  implements OnInit, AfterViewInit, OnDestroy {
  currentItem: DataPost;
  constructor(
    private __CrudPostService: CrudPostService,
    private toastrService: NbToastrService,
    private roleService: RoleService,
    private host: ElementRef,
    private locationStrategy: LocationStrategy
  ) {
    this.initUI();
  }
  @Output() editorKeyup = new EventEmitter<any>();
  @ViewChild("textEditor01") textArea: ElementRef;
  editor: any;
  initUI() {}
  ngOnInit(): void {

    this.currentItem = new DataPost();
  }

  ngAfterViewInit() {
    tinymce.init({
      target: this.textArea.nativeElement,
      plugins: ["link", "paste", "table"],
      skin_url: `${this.locationStrategy.getBaseHref()}assets/skins/lightgray`,
      setup: (editor) => {

        this.editor = editor;

        editor.on("keyup", () => {
          this.editorKeyup.emit(editor.getContent());
        });
      },
      height: "320",
    });
  }
  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
  save(event) {
    let tempData = this.currentItem as DataPost;
    if (AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared) {
      tempData.author =
        AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared.id;
    }


    if (this.editor) {
      // *** CẦN  đoạn này, DÙ đã thiết lập ở template
      // <textarea #textEditor01 [value]="currentItem.content"></textarea>
      // VÌ BÀI VIẾT DÀI THÌ ngModel không đáp ứng nổi, trả về null.
      tempData.content = this.editor.getContent();
    }
    this.__CrudPostService.create(tempData).subscribe((data) => {
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
