import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemListService } from '../../services/item-list/item-list.service';
import { ItemList } from '../../models/item-list/item-list.interface';
// import { ItemComponent } from '../../components/item/item';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {
  
  database = firebase.database();
  itemListRef$: Observable<ItemList[]>;
  items: any;
  
  
  public startCount = 0;
  public limitCount: number = 20;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private itemListService: ItemListService) {
                this.updateList(this.startCount, this.limitCount);
  }

  ref() {
    return this.database.ref('item-list');
  }

  updateList(start: number, limit: number) {
    this.ref().remove();
    this.addItems();
    this.ref().orderByChild('id')
      .startAt(start)
      .limitToFirst(limit)
      .once('value', itemSnapshot => {
        this.items = [];
        itemSnapshot.forEach( itemSnap => {
        this.items.push(itemSnap.val());
        return false;
      });
    });
  }

  // refreshList() {
  //   this.ref().remove();
  //   this.addItems();
  //   this.ref().orderByChild('id')
  //     .startAt(0)
  //     .limitToFirst(20)
  //     .on('value', itemSnapshot => {
  //     this.items = [];
  //     itemSnapshot.forEach( itemSnap => {
  //       this.items.push(itemSnap.val());
  //       return false;
  //     });
  //   });
  // } 

  doRefresh(refresher) {
    this.startCount = 0;
    this.limitCount = 20;
    setTimeout(() => {
      this.updateList(this.startCount, this.limitCount);
      refresher.complete();
    }, 2000);
  }
  
  item = {} as ItemList;
  
  imgUrls: any = [
    'https://firebasestorage.googleapis.com/v0/b/first-ionic-app-38f39.appspot.com/o/img1.jpg?alt=media&token=9b7926e6-6186-4d01-aeaa-185745c3a126',
    'https://firebasestorage.googleapis.com/v0/b/first-ionic-app-38f39.appspot.com/o/img2.jpg?alt=media&token=9dcb5b67-3286-4f2d-a209-4ccdcb82ef32',
    'https://firebasestorage.googleapis.com/v0/b/first-ionic-app-38f39.appspot.com/o/img3.jpg?alt=media&token=541825e5-01a9-4913-b8b7-e6b3fa952f65',
    'https://firebasestorage.googleapis.com/v0/b/first-ionic-app-38f39.appspot.com/o/img4.jpg?alt=media&token=0f39f2cf-241a-428d-b137-77c306367bb6',
    'https://firebasestorage.googleapis.com/v0/b/first-ionic-app-38f39.appspot.com/o/img5.jpg?alt=media&token=741995f8-39b1-4752-a476-f669cdacb6a3'
  ];

  addItems() {
    for (let i = 0; i < 100; i++) {
      this.item.id = i;
      this.item.type = Math.floor(Math.random() * 5);
      this.item.imgUrl = this.imgUrls[this.item.type];
      this.ref().push().set(this.item);
    }
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.startCount += 20;
      // this.limitCount += 20;
      this.ref().orderByChild('id').startAt(this.startCount).limitToFirst(this.limitCount).on('value', itemSnapshot => {
        // this.items = [];
        itemSnapshot.forEach( itemSnap => {
          this.items.push(itemSnap.val());
          return false;
        });
      });
      infiniteScroll.complete();
    }, 500);
  }

}
