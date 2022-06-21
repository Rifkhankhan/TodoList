import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  // eslint-disable-next-line @typescript-eslint/member-ordering
  todoList = [
    {
    itemName:'Coding',
    itemDueDate:'13-12-22',
    itemPriority:'high',
    itemCategory:'work'
  },
  {
    itemName:'Design',
    itemDueDate:'23-10-22',
    itemPriority:'low',
    itemCategory:'Personal'
  },
  {
    itemName:'Shopping',
    itemDueDate:'13-10-22',
    itemPriority:'middle',
    itemCategory:'work'
  },
  {
    itemName:'Workout',
    itemDueDate:'17-03-22',
    itemPriority:'high',
    itemCategory:'work'
  }
];

today: number = Date.now();

}
