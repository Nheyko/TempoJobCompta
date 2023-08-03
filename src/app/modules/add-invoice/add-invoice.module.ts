import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddInvoiceRoutingModule } from './add-invoice-routing.module';
import { AddInvoiceComponent } from './add-invoice.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddInvoiceComponent
  ],
  imports: [
    CommonModule,
    AddInvoiceRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    AddInvoiceComponent
  ]
})
export class AddInvoiceModule { }
