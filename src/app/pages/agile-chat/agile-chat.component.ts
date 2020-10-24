import { Component, OnInit } from "@angular/core";
import { NbAccessChecker } from "@nebular/security";
import { AgileCacheCommonService } from "app/agile-cache-common.service";
import { AgileChatCommonService } from "app/agile-chat-common.service";
import { AgileCommonService } from "app/agile-common.service";
import { RoleService } from "app/auth/role.service";
import { connect } from "http2";
import * as _ from "lodash";

@Component({
  selector: "agile-agile-chat",
  templateUrl: "./agile-chat.component.html",
  styleUrls: ["./agile-chat.component.scss"],
})
export class AgileChatComponent implements OnInit {
  user: any;
  __username: string = "";
  __isLoggedShared: boolean = false;
  constructor(
    private roleService: RoleService,
    public accessChecker: NbAccessChecker,
    private agileChatCommonService: AgileChatCommonService
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

    this.agileChatCommonService.allObservable.subscribe((newMessage) => {
      if(_.isNil(newMessage)) return;


      let __reply = false;

      if (
        !_.isEqual(
          AgileCacheCommonService._AGILE_CACHE_DATA?.userLoggedShared.username,
          newMessage.user.username
        )
      ) {
        __reply = true;
      }

      this.sendMessage(newMessage, newMessage.user.username, 'https://i.gifer.com/no.gif', __reply);
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
    this.agileChatCommonService.sendMessageToServer(event, userName, avatar, reply);
  }

  sendMessage(event: any, userName: string, avatar: string, reply: boolean) {

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: reply,
      type: "text",
      user: {
        name: userName,
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
