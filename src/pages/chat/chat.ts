import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { Message } from '../../models/chat/message.interface';
import { ChatService } from '../../services/chat/chat.service';
import { Observable } from 'rxjs/Observable';
import { Content } from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  
  username: string;
  messageItem = {} as Message;
  groupChatRef$: Observable<Message[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private chat: ChatService) {
                this.getMessagesList();
  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
  }

  ionViewDidLoad() {
    this.getMessagesList();
    window.scrollTo(0,document.body.scrollHeight);
  }
  
  foo() {
    this.getMessagesList();
  }
  
  getMessagesList() {
    this.groupChatRef$ = this.chat
    .getMessageList()
    .snapshotChanges()
    .map(
      changes => {
        return changes.map(change => ({
          key: change.payload.key, ...change.payload.val()
        }))
      }
    )
  }
  
  ionViewWillLoad() {
    window.scrollTo(0,document.body.scrollHeight);
    this.username = this.navParams.get('username');
    if (this.username === undefined) {
      this.username = 'Incognito';
    }
    this.messageItem.author = this.username;
    this.getMessagesList();
  }
  
  sendMessage(messageItem: Message) {
    this.chat.newMessage(messageItem).then(
      res => {
        console.log('success: ', messageItem);
      }
    )
    this.content.scrollToBottom();
    this.messageItem.message = '';
  }

}
