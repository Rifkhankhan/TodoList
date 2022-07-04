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

  constructor(private http: HttpClient) {
  }

  get getAllTodo()
  {
    return this._todlists.asObservable();
  }

  fetchTodos()
  {
    return this.http.get<{[key: string]: Home}>('http://localhost:3000/api/lists').pipe(
      take(1),
      map(data=>{
        const list=[];

        for(const key in data)
        {
          if(data.hasOwnProperty(key))
          {
            list.push({
              _id:data[key]._id,
              itemName:data[key].itemName,
              itemDueDate:data[key].itemDueDate,
              itemPriority:data[key].itemPriority,
              itemCategory:data[key].itemCategory,
            });
          }
        }
        return list;
      }),
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

      this._todlists.next(data.concat(newTask));

    })
    );
  }

  deleteTask(id: string){
    return this.http.delete(`http://localhost:3000/api/Delete/${id}`).pipe(
      take(1),
      switchMap(()=>{
        return this.getAllTodo
      }),
      tap(data=>{
        this._todlists.next(data.filter(p => p.id !== id));
      })
    );
  }

  updateTask(todo: Home){
    return this.http.put(`http://localhost:3000/api/Delete/${todo._id}`, todo);
  }


}
