import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { TodoItem } from '../../models/todo/todo-item.interface';
import { TodoFormPage } from '../../pages/todo-form/todo-form';
import { EditTodoItemPage } from '../../pages/edit-todo-item/edit-todo-item';
import { TodoListService } from '../../services/todo-list/todo-list.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html'
})
export class TodoListPage {

  todoListRef$: Observable<TodoItem[]>;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private database: AngularFireDatabase,
              private todoListService: TodoListService) {
                
                this.todoListRef$ = this.todoListService
                  .getTodoList()
                  .snapshotChanges()
                  .map(
                    changes => {
                      return changes.map(c => ({
                        key: c.payload.key, ...c.payload.val()
                      }))
                    }
                  )
  }

  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {
  //     for (let i = 0; i < 5; i++) {
  //       this.todoListRef$.toPromise().then(
  //         (data) => {
  //           console.log(data);
  //         }
  //       );
  //     }

  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();
  //   }, 500);
  // }

  // this.todoListRef$.toPromise().then(
  //   (res) => {
  //     console.log('length: ', res.length + 1);
  //   }
  // )

  navigateToTodoForm() {
    this.navCtrl.push(TodoFormPage);
  }

  delete(item: TodoItem) {
    this.todoListService.removeItem(item).then(
      () => {
        console.log('remove item: ', item);
      }
    )
  }

  edit(item: TodoItem) {
    this.navCtrl.push(EditTodoItemPage, { item });
  }

}
