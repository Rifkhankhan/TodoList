import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {

  categories = ['Coding','Design','Shopping','Workout'];
  taskName;
  taskDate;
  taskPriority;
  taskCategory;
  constructor(private model:ModalController) { }

  ngOnInit() {
  }

  async close(){
    await this.model.dismiss(this.taskObj);
  }

  selectedCategory(index: number)
  {
    this.taskCategory = this.categories[index];

  }

  taskObj;

  addTask()
  {
    this.taskObj = {
        itemName: this.taskName,
        itemDueDate:this.taskDate,
        itemPriority:this.taskPriority,
        itemCategory:this.taskCategory
    };

    this.close();
  }


}
