import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

//   getStatus() {
//     return this.facebook.getLoginStatus().then(
//         (response) => {
//             alert('getstatus success ' + JSON.stringify(response));
//             if (response.status === 'connected') {
//                 this.navCtrl.push(HomePage);
//             } else {
//                 this.navCtrl.push(ChatPage);
//             }
//         },
//         (error) => {
//             console.log('error: ', error);
//             alert('getstatus error ' + JSON.stringify(error));
//         }
//     )
// }
  
}

