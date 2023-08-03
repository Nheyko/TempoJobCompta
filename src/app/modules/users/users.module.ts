import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './users.service';
import { StringifyGenderPipe } from './stringify-gender.pipe';
import { StringifyRolePipeModule } from './stringify-role-pipe.module';
import { FormatPipeModule } from 'src/app/format-pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersComponent,
    StringifyGenderPipe,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule,
    FormatPipeModule,
    StringifyRolePipeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    UsersComponent,
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
