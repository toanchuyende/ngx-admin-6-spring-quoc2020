import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataPost } from "app/models/data-post";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { CrudPostService } from "../crud-post.service";

var _ = require("lodash");
var HTMLParser = require("node-html-parser");

@Component({
  selector: "agile-crud-post-list",
  templateUrl: "./crud-post-list.component.html",
  styleUrls: ["./crud-post-list.component.scss"],
})
export class CrudPostListComponent {
  settings = {
    actions: {
      columnTitle: "Actions",
      add: false,
      edit: false,
      delete: false,
      custom: [

      ],
      position: "left",
    },

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      button: {
        title: "Chức năng",
        type: "custom",
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          //
          // alert(`${row.name} saved!`);

          instance.save.subscribe((row) => {
            alert(`${row.name} saved!`);
          });
        },
      },
      id: {
        title: "ID",
        type: "string",
      },
      title: {
        title: "Title",
        type: "string",
      },
      // content: {
      //   title: "Content",
      //   type: "string",
      // },
      contentReadable: {
        title: "contentReadable",
        type: "string",
      },
      author: {
        title: "Author",
        type: "string",
      },
      tag: {
        title: "Username",
        type: "string",
      },
      attachment: {
        title: "E-mail",
        type: "string",
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    // private service: SmartTableData,
    private route: ActivatedRoute,
    private router: Router,
    private __CrudPostService: CrudPostService
  ) {
    this.loadData();
  }
  static listDataPost: DataPost[];
  async loadData() {
    // this.data = this.service.getData();

    let tempData = await this.__CrudPostService.getAll().toPromise();
    //

    CrudPostListComponent.listDataPost = tempData._embedded.post;

    for (let item of tempData._embedded.post) {
      let root = HTMLParser.parse(item.content);


      let str = root.rawText.toString();

      item["contentReadable"] =
        str.length > 10 ? `${str.substring(0, 10)}...` : str; // root.rawText.toString().substring(0, 12); //"Không cho đọc đâu nhé!";
    }

    // this.data = this.service.getData();
    this.source.load(tempData._embedded.post);
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onClickCreate(event) {
    this.router.navigate(["/management/post/create"]);
  }

  onEdit(event) {
    // CrudPostService.currentItem =
    this.router.navigate(["/edit", { id: null }]);
  }

  onCustom(event) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
  }

  static findCurrentItem(rowData): DataPost {
    for (let item of this.listDataPost) {
      if (_.isEqual(rowData.id, item.id)) {
        return item;
      }
    }
    return null;
  }
}

@Component({
  selector: "button-view",
  template: `
    <button nbButton status="warning" (click)="onClick($event)">
      <nb-icon icon="edit-outline"></nb-icon>
      <!-- <nb-icon icon="file-text-outline"></nb-icon> -->
      <!-- <span></span> -->
    </button>
    <button nbButton status="danger" (click)="onClickDelete($event)">
      <nb-icon icon="trash-2-outline"></nb-icon>
      <!-- <span></span> -->
    </button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router) {}

  onClick(event) {
    CrudPostService.currentItem = CrudPostListComponent.findCurrentItem(
      this.rowData
    );

    this.router.navigate(["/management/post/edit", { id: null }]);
    // this.router.navigateByUrl('~/#/management/post/edit');

    //
    // this.save.emit(this.rowData);
  }

  onClickCreate(event) {
    this.router.navigate(["/management/post/create"]);
  }

  onClickDelete(event) {
    // CrudPostService.currentItem = this.rowData;
    // this.router.navigate(["/management/post/edit", { id: null }]);
  }
}
