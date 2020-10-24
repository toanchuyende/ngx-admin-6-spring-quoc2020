import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'agile-crud-user-create',
  templateUrl: './crud-user-create.component.html',
  styleUrls: ['./crud-user-create.component.scss']
})
export class CrudUserCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

// import { Component, OnInit } from "@angular/core";
// import { NbToastrService } from "@nebular/theme";
// import { AgileCacheCommonService } from 'app/agile-cache-common.service';
// import { RoleService } from "app/auth/role.service";
// import { DataPost } from "app/models/data-post";
// import { CrudPostService } from "../crud-post.service";

// @Component({
//   selector: "agile-crud-post-create",
//   templateUrl: "./crud-post-create.component.html",
//   styleUrls: ["./crud-post-create.component.scss"],
// })
// export class CrudPostCreateComponent {
//   currentItem: DataPost;
//   constructor(
//     private __CrudPostService: CrudPostService,
//     private toastrService: NbToastrService,
//     private roleService: RoleService
//   ) {
//     this.initUI();
//   }
//   initUI() {}
//   ngOnInit(): void {
//     this.currentItem = new DataPost();
//   }

//   save(event) {
//     let tempData = this.currentItem as DataPost;
//     if (AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared) {
//       tempData.author = AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared.id;
//     }

//     this.__CrudPostService.create(tempData).subscribe((data) => {
//       if (data) {
//         this.currentItem = data;
//         this.showToast(
//           "bottom-left",
//           "success",
//           `Đã tạo mới thành công: ${this.currentItem.title}`
//         );
//         // https://akveo.github.io/nebular/docs/components/toastr/overview#nbtoastrservice
//       }
//     });
//   }

//   showToast(position, status, text) {
//     // this.index += 1;
//     this.toastrService.show(status || "Success", `${text}`, {
//       position,
//       status,
//     });
//   }
// }
