import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { NbAccessChecker } from "@nebular/security";
import { AgileCacheCommonService } from "app/agile-cache-common.service";
import { AgileChatCommonService } from "app/agile-chat-common.service";
import { AgileCommonService } from "app/agile-common.service";
import { RoleService } from "app/auth/role.service";
import { DataConversation } from "app/models/data-conversation";
import { connect } from "http2";
import * as _ from "lodash";
import { CrudConversationService } from "../crud-conversation.service";

import { AgileMessage } from "../../../agile-message-user";
import { DataMessage } from "app/models/data-message";

@Component({
  selector: "agile-conversation-open",
  templateUrl: "./conversation-open.component.html",
  styleUrls: ["./conversation-open.component.scss"],
})
export class ConversationOpenComponent implements OnInit, OnChanges {
  user: any;
  __username: string = "";
  __isLoggedShared: boolean = false;

  currentConversation: DataConversation;
  @Input() currentId: String = "";

  constructor(
    private roleService: RoleService,
    public accessChecker: NbAccessChecker,
    private agileChatCommonService: AgileChatCommonService,
    private __CrudConversationService: CrudConversationService
  ) {
    this.roleService.onUserLoginChatChange().subscribe((userLogged: any) => {
      if (AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared) {
        this.user = AgileCacheCommonService._AGILE_CACHE_DATA.userLoggedShared;
        console.debug("this.user: ", this.user);
        this.__username = this.user["username"];
        this.__isLoggedShared = true;
      }
    });

    this.connectToServer();
    // observableSelectChatOpen
    this.agileChatCommonService.observableSelectChatOpen.subscribe(
      (newConversationId: String) => {
        if (_.isNil(newConversationId)) return;
        // this.currentConversation = newConversation;
        this.currentId = newConversationId;

        this.loadData(this.currentId);

        // let __reply = false;

        // if (
        //   !_.isEqual(
        //     AgileCacheCommonService._AGILE_CACHE_DATA?.userLoggedShared.username,
        //     newMessage.user.username
        //   )
        // ) {
        //   __reply = true;
        // }

        // this.sendMessage(
        //   newMessage,
        //   newMessage.user.username,
        //   "https://i.gifer.com/no.gif",
        //   __reply
        // );
      }
    );

    // allObservable
    this.agileChatCommonService.allObservable.subscribe(
      (newMessageEntry: AgileMessage) => {


        if (_.isNil(newMessageEntry)) return;

        let __reply = false;

        // Neu khong dung nhom chat
        if (
          !_.isEqual(
            AgileChatCommonService._SHARE_selectChatOpenId,
            newMessageEntry.conversationId
          )
        ) {
          return;
        }

        // kiem tra ai la nguoi gui

        if (
          !_.isEqual(
            AgileCacheCommonService._AGILE_CACHE_DATA?.userLoggedShared
              .username,
            newMessageEntry.user.username
          )
        ) {
          __reply = true;
        }

        this.sendMessage(
          newMessageEntry,
          newMessageEntry.user.username,
          "https://i.gifer.com/no.gif",
          __reply
        );
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // //
    for (const proName in changes) {
      switch (proName) {
        case "currentId":
          this.loadData(this.currentId);
          break;
      }
    }
    // changes.prop contains the old and the new value...
  }
  loadData(id) {
    this.__CrudConversationService
      .getOne(id)
      .subscribe((data: DataConversation) => {
        if (data.id === this.currentId) {
          this.currentConversation = data;
        }
      });

    this.loadListMessageOnConversation(id);
  }

  loadListMessageOnConversation(id) {
    this.__CrudConversationService
      .getListMessageWithByConversationId(id)
      .subscribe((data: DataMessage[]) => {

        this.messages = [];
        if (_.isNil(data)) {
          return;
        }

        for (let messageItem of data) {
          let newMessageEntry = new AgileMessage();
          newMessageEntry.conversationId = messageItem.conversationId;
          newMessageEntry.message = messageItem.body;
          newMessageEntry.user.email = messageItem.sender;
          newMessageEntry.user.id = messageItem.sender;
          newMessageEntry.user.username = messageItem.sender;
          let __reply = false;
          if (
            !_.isEqual(
              AgileCacheCommonService._AGILE_CACHE_DATA?.userLoggedShared
                .id,
              newMessageEntry.user.id
            )
          ) {
            __reply = true;
          }
          this.sendMessage(
            newMessageEntry,
            newMessageEntry.user.username,
            "https://i.gifer.com/no.gif",
            __reply
          );
        }

        // if (data.id === this.currentId) {
        //   this.currentConversation = data;
        // }
      });
  }

  connectToServer() {
    this.agileChatCommonService.connect();
  }

  ngOnInit(): void {}

  messages: any[] = [];

  sendMessageToServer(
    event: any,
    userName: string,
    avatar: string,
    reply: boolean
  ) {
    this.agileChatCommonService.sendMessageToServer(
      event,
      userName,
      avatar,
      reply
    );
  }

  sendMessage(event: any, username: String, avatar: string, reply: boolean) {
    let __AgileMessage = event as AgileMessage;

    if (!_.isEqual(__AgileMessage.conversationId, this.currentId)) {
    }

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: reply,
      type: "text",
      user: {
        name: username,
        avatar: avatar,
      },
    });

    // this.messages.push({
    //   text: "Ok bạn.",
    //   date: new Date(),
    //   reply: true,
    //   type: "text",
    //   user: {
    //     name: "chatbot.agileviet.vn",
    //     avatar: avatar,
    //   },
    // });
  }
}
