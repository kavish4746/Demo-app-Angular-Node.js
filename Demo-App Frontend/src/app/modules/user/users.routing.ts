import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';

const arr: Routes = [
  { path: '', component: UsersComponent }
];

export const routingUserArr = RouterModule.forChild(arr);