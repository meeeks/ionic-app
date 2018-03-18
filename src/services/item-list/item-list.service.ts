import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ItemListService {

    private todoListRef = this.database.list('item-list', ref => ref.limitToFirst(2));

    constructor(private database: AngularFireDatabase) {}

    getItemList(count: number) {
        return this.database.list('item-list', ref => ref.limitToFirst(count));
    }

    addNewItem(item) {
        return this.todoListRef.push(item);
    }

    removeItemList() {
        return this.todoListRef.remove();
    }
}