import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
// import { TodoItem } from '../../models/todo/todo-item.interface';
// import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ToastService {

    constructor(private toast: ToastController) {}

    showToast(message: string, duration: number = 3000) {
        return this.toast.create({
            message,
            duration,
        })
        .present();
    }
    
}