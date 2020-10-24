import { Injectable } from "@angular/core";

import * as SockJS from "sockjs-client";
import * as Stomp from "@stomp/ng2-stompjs";
import * as stompjs from "@stomp/stompjs";
import { AgileCacheCommonService } from "./agile-cache-common.service";
import { AgileMessage } from "./agile-message-user";
import * as _ from "lodash";
import { of as observableOf, Observable, BehaviorSubject } from "rxjs";
import { DataConversation } from "./models/data-conversation";
export function mySocketFactory() {
  return new SockJS(
    "http://message.kenhthongtinsinhvien.com/gs-guide-websocket"
  );
}

@Injectable({
  providedIn: "root",
})
export class AgileChatCommonService {
  constructor() {}

  socket: SockJS;

  stompClient = null;

  connectComponent: any;
  disconnectComponent: any;
  conversationComponent: any;
  greetingsComponent: any;

  setConnected(connected) {
    //
    // this.connectComponent.prop("disabled", connected);
    // this.disconnectComponent.prop("disabled", !connected);
    // if (connected) {
    //   this.conversationComponent.show();
    // } else {
    //   this.conversationComponent.hide();
    // }
    // this.greetingsComponent.html("");
  }

  static listReceived: AgileMessage[] = [];

  connect() {
    this.socket = mySocketFactory();
    this.stompClient = stompjs.Stomp.over(this.socket);
    this.stompClient.connect({}, (frame) => {
      //
      this.setConnected(true);
      console.log("Connected: " + frame);
      this.stompClient.subscribe("/topic/client-receive", (message) => {
        let newData = JSON.parse(message?.body);
        AgileChatCommonService.listReceived.push(newData);

        this.mySubject.next(newData);
        // this.hasNewMessage();
        // this.showGreeting(JSON.parse(greeting.body).content);
      });

      console.log("init chat");
    });
  }

  newData: AgileMessage = null;

  private mySubject = new BehaviorSubject<AgileMessage>(this.newData);
  allObservable: Observable<AgileMessage> = this.mySubject.asObservable();

  selectChatOpenId: String = "";
  private subjectSelectChatOpen = new BehaviorSubject<String>(
    this.selectChatOpenId
  );
  observableSelectChatOpen: Observable<
    String
  > = this.subjectSelectChatOpen.asObservable();

  static _SHARE_selectChatOpenId: string;

  setNewConversationOpen(id: string) {
    this.selectChatOpenId = id;
    this.subjectSelectChatOpen.next(id);
    AgileChatCommonService._SHARE_selectChatOpenId = id;
  }
  // hasNewMessage(newData): Observable<AgileMessage> {
  //   // let data = _.last(AgileChatCommonService.listReceived);
  //   this.mySubject.next(newData);
  // }

  //  disconnect() {
  //   if (stompClient !== null) {
  //     stompClient.disconnect();
  //   }
  //   setConnected(false);
  //   console.log("Disconnected");
  // }

  sendMessageToServer(
    event: any,
    userName: string,
    avatar: string,
    reply: boolean
  ) {
    let packageData = new AgileMessage();

    packageData.conversationId = AgileChatCommonService._SHARE_selectChatOpenId;

    packageData.user.username =
      AgileCacheCommonService._AGILE_CACHE_DATA?.userLoggedShared.username;

    packageData.user.id =
      AgileCacheCommonService._AGILE_CACHE_DATA?.userLoggedShared.id;

    packageData.user.email =
      AgileCacheCommonService._AGILE_CACHE_DATA?.userLoggedShared.email;

    packageData.message = event?.message;

    this.stompClient.send(
      "/socket-app/client-send",
      {},
      JSON.stringify(packageData)
    );
  }

  //  showGreeting(message) {
  //   $("#greetings").append("<tr><td>" + message + "</td></tr>");
  // }

  // $(function () {
  //   $("form").on("submit", function (e) {
  //     e.preventDefault();
  //   });
  //   $("#connect").click(function () {
  //     connect();
  //   });
  //   $("#disconnect").click(function () {
  //     disconnect();
  //   });
  //   $("#send").click(function () {
  //     sendName();
  //   });
  // });
}
