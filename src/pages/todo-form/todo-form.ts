import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodoItem } from '../../models/todo/todo-item.interface';
import { TodoListService } from '../../services/todo-list/todo-list.service';

@Component({
  selector: 'page-todo-form',
  templateUrl: 'todo-form.html',
})
export class TodoFormPage {

  todoItem = {} as TodoItem;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private todoListService: TodoListService) {}
  
  addTodoItem(todoItem: TodoItem) {
    this.todoListService.addNewItem(todoItem).then(
      res => {
        this.navCtrl.pop();
      }
    )
  }

}
