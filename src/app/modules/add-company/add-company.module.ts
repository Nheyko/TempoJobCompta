import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCompanyRoutingModule } from './add-company-routing.module';
import { AddCompanyComponent } from './add-company.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddCompanyComponent
  ],
  imports: [
    CommonModule,
    AddCompanyRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    AddCompanyComponent
  ]
})
export class AddCompanyModule { }
