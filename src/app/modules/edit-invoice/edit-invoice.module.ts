import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditInvoiceRoutingModule } from './edit-invoice-routing.module';
import { EditInvoiceComponent } from './edit-invoice.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditInvoiceComponent
  ],
  imports: [
    CommonModule,
    EditInvoiceRoutingModule,
    ReactiveFormsModule
  ],
  exports: [ 
    EditInvoiceComponent 
  ]
})
export class EditInvoiceModule { }
