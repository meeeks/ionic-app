import { Injectable } from '@angular/core';
import { Message } from '../../models/chat/message.interface';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ChatService {

    private groupChatRef = this.database.list('group-chat');

    constructor(private database: AngularFireDatabase) {}

    getMessageList() {
        return this.groupChatRef;
    }

    newMessage(item: Message) {
        return this.groupChatRef.push(item).then(
            res => console.log('item: ', item)
        );
    }
}