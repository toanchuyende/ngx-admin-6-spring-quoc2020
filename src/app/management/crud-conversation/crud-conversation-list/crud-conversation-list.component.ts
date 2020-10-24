import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AgileChatCommonService } from 'app/agile-chat-common.service';
import { DataConversation } from "app/models/data-conversation";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { CrudConversationService } from "../crud-conversation.service";

var _ = require("lodash");
var HTMLParser = require("node-html-parser");

@Component({
  selector: "agile-crud-conversation-list",
  templateUrl: "./crud-conversation-list.component.html",
  styleUrls: ["./crud-conversation-list.component.scss"],
})
export class CrudConversationListComponent {
  settings = {
    actions: {
      columnTitle: "Actions",
      add: false,
      edit: false,
      delete: false,
      custom: [],
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
        renderComponent: ConversationButtonViewComponent,
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
      isActive: {
        title: "isActive",
        type: "string",
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  selectId: String;
  static selectIdShare: String;

  constructor(
    // private service: SmartTableData,
    private route: ActivatedRoute,
    private router: Router,
    private __CrudConversationService: CrudConversationService
  ) {
    this.loadData();
  }
  static listDataConversation: DataConversation[];
  async loadData() {
    // this.data = this.service.getData();

    let tempData = await this.__CrudConversationService.getAll().toPromise();
    //

    CrudConversationListComponent.listDataConversation =
      tempData._embedded.conversation;

    // this.data = this.service.getData();
    this.source.load(tempData._embedded.conversation);
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onClickCreate(event) {
    this.router.navigate(["/management/conversation/create"]);
  }

  onEdit(event) {
    // CrudConversationService.currentItem =

    this.router.navigate(["/edit", { id: null }]);
  }

  onCustom(event) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
  }

  onClickOpen(event) {

  }

  static findCurrentItem(rowData): DataConversation {
    for (let item of this.listDataConversation) {
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
    <!-- <button nbButton status="warning" (click)="onClick($event)">
      <nb-icon icon="edit-outline"></nb-icon>
      <nb-icon icon="file-text-outline"></nb-icon>
      <span></span>
    </button>
    <button nbButton status="danger" (click)="onClickDelete($event)">
      <nb-icon icon="trash-2-outline"></nb-icon>
      <span></span>
    </button> -->
    <button nbButton status="info" (click)="onClickOpen($event)">
      <nb-icon icon="message-square-outline"></nb-icon>
      <!-- <span></span> -->
    </button>
  `,
})
export class ConversationButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(
    private router: Router,
    private __AgileChatCommonService: AgileChatCommonService
  ) {}

  onClick(event) {

    CrudConversationService.currentItem = CrudConversationListComponent.findCurrentItem(
      this.rowData
    );

    this.router.navigate(["/management/conversation/edit"]);
    // this.router.navigateByUrl('~/#/management/conversation/edit');

    //
    // this.save.emit(this.rowData);
  }

  onClickCreate(event) {
    this.router.navigate(["/management/conversation/create"]);
  }

  onClickDelete(event) {
    // CrudConversationService.currentItem = this.rowData;
    // this.router.navigate(["/management/conversation/edit", { id: null }]);
  }

  onClickOpen(event) {

    CrudConversationService.currentItem = CrudConversationListComponent.findCurrentItem(
      this.rowData
    );

    this.__AgileChatCommonService.setNewConversationOpen(CrudConversationService.currentItem.id);
  }
}
