import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HomePage } from '../../pages/home/home';
import { ChatPage } from '../../pages/chat/chat';

@Injectable()
export class AuthService {

    // private groupChatRef = this.database.list('group-chat');

    constructor(private database: AngularFireDatabase,
                private facebook: Facebook) {
        // this.getStatus();
    }

    // isAuthorized: boolean;
    
    getStatus() {
        return this.facebook.getLoginStatus();
    }
    
}

// getMessageList() {
//     return this.groupChatRef;
// }

// newMessage() {
//     return this.groupChatRef.push(item);
// }