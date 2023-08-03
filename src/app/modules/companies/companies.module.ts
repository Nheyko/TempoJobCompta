import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatPipeModule } from 'src/app/format-pipe.module';
import { IsCustomerPipe } from './is-customer.pipe';

@NgModule({
  declarations: [
    CompaniesComponent,
    IsCustomerPipe
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    ReactiveFormsModule,
    FormatPipeModule,
  ],
  exports: [
    CompaniesComponent
  ]
})
export class CompaniesModule { }
