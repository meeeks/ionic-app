import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TodoItem } from '../../models/todo/todo-item.interface';
import { TodoListService } from '../../services/todo-list/todo-list.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'page-edit-todo-item',
  templateUrl: 'edit-todo-item.html',
})
export class EditTodoItemPage {

  item: TodoItem;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private todoListService: TodoListService,
              private toast: ToastService) {
  }

  ionViewWillLoad() {
    this.item = this.navParams.get('item');
  }

  saveItem(item: TodoItem) {
    this.todoListService.editItem(item).then(
      () => {
        this.toast.showToast(item.itemName + ' was changed!');
        this.navCtrl.pop();
      }
    )
  }

}