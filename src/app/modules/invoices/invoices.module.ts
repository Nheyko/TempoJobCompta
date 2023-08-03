import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { StringifyStatePipe } from './stringify-state.pipe';
import { FormatPipeModule } from 'src/app/format-pipe.module';

@NgModule({
  declarations: [
    InvoicesComponent,
    StringifyStatePipe,
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    FormatPipeModule
  ],
  exports: [
    InvoicesComponent
  ]
})
export class InvoicesModule { }
