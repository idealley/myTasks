import { Component } from '@angular/core';
import { TaskService } from './services/tasks.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [TaskService]
})
export class AppComponent { }
