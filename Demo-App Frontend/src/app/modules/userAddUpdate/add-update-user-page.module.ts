import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUpdateUserPageComponent } from './add-update-user-page/add-update-user-page.component';
import { routingAddupdateArr } from './add-update-user-page.routing';

import { SharedModule} from '../../Shared/shared/shared.module'

@NgModule({
declarations: [
  AddUpdateUserPageComponent
],
imports: [
  CommonModule,
  routingAddupdateArr,
  SharedModule
]
})

export class AddUpdateModule {}