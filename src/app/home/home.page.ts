import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { StorageService } from '../todo.service';
import { Home } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {

  constructor(private modelCtrl: ModalController,private todoService: StorageService) {}

  // eslint-disable-next-line @typescript-eslint/member-ordering
  todoList: Home[];

// eslint-disable-next-line @typescript-eslint/member-ordering
today: number = Date.now();
sub:Subscription;

ngOnInit()
{
 this.sub= this.todoService.getAllTodo.subscribe(list=>{
    this.todoList = list;
  });
}

ionViewWillEnter()
{
  this.sub= this.todoService.fetchTodos().subscribe(data=>{
    this.todoList = data;
  });
}


async addTask(){
  const model  = await this.modelCtrl.create({
    component: AddNewTaskPage
  });


  model.onDidDismiss().then(newtaskObj=>{

    this.sub = this.todoService.addTask(newtaskObj.data).subscribe();
  });

  return await model.present();
}

cancel(index: number)
{
 this.todoList.splice(index,1);
}

ngOnDestroy(): void {
  if(this.sub)
  {
    this.sub.unsubscribe();
  }
}
}
