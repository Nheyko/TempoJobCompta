import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringifyRolePipe } from './stringify-role.pipe';

@NgModule({
  declarations: [StringifyRolePipe],
  imports: [
    CommonModule
  ],
  exports: [
    StringifyRolePipe
  ]
})
export class StringifyRolePipeModule { }
