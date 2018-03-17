import { Injectable } from '@angular/core';
import { TodoItem } from '../../models/todo/todo-item.interface';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class TodoListService {

    private todoListRef = this.database.list<TodoItem>('todo-list');

    constructor(private database: AngularFireDatabase) {}

    getTodoList() {
        return this.todoListRef;
    }

    addNewItem(item: TodoItem) {
        return this.todoListRef.push(item);
    }

    removeItem(item: TodoItem) {
        return this.todoListRef.remove(item.key);
    }
    
    editItem(item: TodoItem) {
        return this.todoListRef.update(item.key, item);
    }
}