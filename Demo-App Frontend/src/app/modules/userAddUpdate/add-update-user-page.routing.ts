import { Routes, RouterModule } from '@angular/router';
import { AddUpdateUserPageComponent } from './add-update-user-page/add-update-user-page.component';

const arr: Routes = [
  { path: '', component: AddUpdateUserPageComponent }
];

export const routingAddupdateArr = RouterModule.forChild(arr);