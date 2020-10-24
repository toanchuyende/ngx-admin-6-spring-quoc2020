import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messages: string[] = [];

    add(message: string) {
        this.messages.push(message);
    }

    clear() {
        this.messages = [];
    }

    private subject = new Subject<any>();

    sendMessage(message: string) {
        this.subject.next({text: message});
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
