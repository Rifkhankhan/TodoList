/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import {map, switchMap, take, tap} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Home } from './home/home.model';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _todlists = new BehaviorSubject([]);


  private getUrl = '/api/lists';
  private insertUrl = '/api/insertlist';
  private updateVideoUrl = '/api/updateList';
  private deleteUrl = '/api/Delete';

  constructor(private http: HttpClient) {
  }

  get getAllTodo()
  {
    return this._todlists.asObservable();
  }

  fetchTodos()
  {

    return this.http.get<any>('http://localhost:3000/api/lists').pipe(
      map(data=>{
        const list=[];

        for(const key in data)
        {
          if(data.hasOwnProperty(key))
          {
            list.push({
              _id:key,
              itemName:data[key].itemName,
              itemDueDate:data[key].itemDueDate,
              itemPriority:data[key].itemPriority,
              itemCategory:data[key].itemCategory,
            });
          }
        }

        return list;
      }),
      take(1),
      tap(list=>{
        this._todlists.next(list);
      })
    );

  }
  addTask(todo: Home){
    let genId: string;

    const newTask = {
      _id:Math.random().toString(),
      itemName:todo.itemName,
      itemDueDate:todo.itemDueDate,
      itemPriority:todo.itemPriority,
      itemCategory:todo.itemCategory,
    };

    return this.http.post<{name: string}>('http://localhost:3000/api/insertlist',{...newTask,_id:null}).pipe(
    take(1),
    switchMap(data=>{
      genId = data.name;

      return this.getAllTodo;
    }),
    tap(data=>{
      newTask._id = genId;

      this._todlists.next(data);

    })
    );
  }

  deleteTask(id: string){
    return this.http.delete('http://localhost:3000/api/Delete'+id);
  }

  updateTask(todo: Home){
    return this.http.put('http://localhost:3000/api/updateList'+todo.id, todo);
  }


}
