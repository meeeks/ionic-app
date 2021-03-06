import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TodoListPage } from '../pages/todo-list/todo-list';
import { TodoFormPage } from '../pages/todo-form/todo-form';
import { EditTodoItemPage } from '../pages/edit-todo-item/edit-todo-item';
import { ChatPage } from '../pages/chat/chat';

import { TodoListService } from '../services/todo-list/todo-list.service';
import { ToastService } from '../services/toast/toast.service';
import { ChatService } from '../services/chat/chat.service';
import { AuthService } from '../services/auth/auth.service';

import { Facebook } from '@ionic-native/facebook';

import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyB7VwTAseSMC6grbpuB-RjBWG0hpq2df8c",
  authDomain: "first-ionic-app-38f39.firebaseapp.com",
  databaseURL: "https://first-ionic-app-38f39.firebaseio.com",
  projectId: "first-ionic-app-38f39",
  storageBucket: "first-ionic-app-38f39.appspot.com",
  messagingSenderId: "55410177636"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TodoListPage,
    TodoFormPage,
    EditTodoItemPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TodoListPage,
    TodoFormPage,
    EditTodoItemPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoListService,
    ToastService,
    ChatService,
    AuthService
  ]
})
export class AppModule {}
