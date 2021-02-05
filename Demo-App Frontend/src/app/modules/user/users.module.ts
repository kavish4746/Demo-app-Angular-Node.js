import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users/users.component';
import { routingUserArr } from './users.routing';

import { SharedModule} from '../../Shared/shared/shared.module'

@NgModule({
declarations: [
    UsersComponent
],
imports: [
  CommonModule,
  routingUserArr,
  SharedModule
]
})

export class UserModule {}