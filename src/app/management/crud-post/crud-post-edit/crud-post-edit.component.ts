import { LocationStrategy } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbToastrService } from '@nebular/theme';
import { DataPost } from "app/models/data-post";
import { CrudPostService } from "../crud-post.service";

@Component({
  selector: "agile-crud-post-edit",
  templateUrl: "./crud-post-edit.component.html",
  styleUrls: ["./crud-post-edit.component.scss"],
})
export class CrudPostEditComponent implements OnInit, AfterViewInit {
  currentItem: DataPost;

  @Output() editorKeyup = new EventEmitter<any>();
  @ViewChild("textEditor01") textArea: ElementRef;
  editor: any;

  constructor(
    private fb: FormBuilder,
    private __CrudPostService: CrudPostService,
    private toastrService: NbToastrService,
    private locationStrategy: LocationStrategy
  ) {
    this.initUI();
  }


  initUI() {

  }
  ngOnInit(): void {
    this.currentItem = CrudPostService.currentItem;
  }

  ngAfterViewInit() {
    tinymce.init({
      target: this.textArea.nativeElement,
      plugins: ["link", "paste", "table"],
      skin_url: `${this.locationStrategy.getBaseHref()}assets/skins/lightgray`,
      setup: (editor) => {

        this.editor = editor;
        // this.editor.setContent(this.currentItem.content);
        editor.on("keyup", () => {
          this.editorKeyup.emit(editor.getContent());
        });
      },
      height: "320",
    });
  }

  saveEdit(event) {

    let tempData = this.currentItem as DataPost;
    if (this.editor) {
      // *** CẦN  đoạn này, DÙ đã thiết lập ở template
      // <textarea #textEditor01 [value]="currentItem.content"></textarea>
      // VÌ BÀI VIẾT DÀI THÌ ngModel không đáp ứng nổi, trả về null.
      tempData.content = this.editor.getContent();
    }
    this.__CrudPostService
      .update(this.currentItem.id, tempData)
      .subscribe((data) => {
        try {
          if (data.id === this.currentItem.id) {
            // this.showSuccess('Lưu thông tin Bãi bồi ' + data.Ten + '!');
            this.currentItem = data;
            this.showToast('bottom-left', 'success', `Đã cập nhật thành công: ${this.currentItem.title}`);
            // https://akveo.github.io/nebular/docs/components/toastr/overview#nbtoastrservice
          }
          // this.loadData_LoaiDoiTuong();
        } catch (error) {
          this.showToast('bottom-right', 'danger', `KHONG nhật thành công: ${this.currentItem.title}`);
        }
      });
  }

  showToast(position, status, text) {
    // this.index += 1;
    this.toastrService.show(
      status || 'Success',
      `${text}`,
      { position, status });
  }
}
