import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TodoListPage } from '../../pages/todo-list/todo-list';
import { ChatPage } from '../../pages/chat/chat';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userData: any;
  public isAuth: boolean = false;
  
  constructor(public navCtrl: NavController,
             private facebook: Facebook,
             private auth: AuthService) {
              this.getAuthStatus();
  }

  getAuthStatus() {
    this.auth.getStatus().then(
      (response) => {
          if (response.status === 'connected') {
            this.isAuth = true;
          } else {
            this.isAuth = false;
          }
      }
    )
  }
  
  navigateToTodoList() {
    this.navCtrl.push(TodoListPage);
  }
  
  toGroupChat(username) {
    this.navCtrl.push(ChatPage, { username });
  }

  login() {
    const facebookParams = 'me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)';
    this.facebook.login(
      ['email', 'public_profile']
    ).then(
      (response: FacebookLoginResponse) => {
        this.facebook.api(facebookParams, []).then(
          profile => {
            this.userData = {
              email: profile['email'],
              first_name: profile['first_name'],
              picture: profile['picture_large']['data']['url'],
              username: profile['name']
            }
            this.getAuthStatus();
          }
        )
      }
    )
  }
  
  logout() {
    this.facebook.logout().then(
      (success) => {
        this.getAuthStatus();
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }
  
}
