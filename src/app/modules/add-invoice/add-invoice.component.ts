import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderService } from 'src/app/layout/header/header.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Location } from '@angular/common';

import { Company } from '../companies/company';
import { CompaniesService } from '../companies/companies.service';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  constructor(
    private titleService: Title,
    private headerService: HeaderService,
    private companiesService: CompaniesService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  form: FormGroup = new FormGroup({

    name: new FormControl(""),
    comment: new FormControl(""),
    id_customer: new FormControl(""),
    id_vendor: new FormControl(""),
    id_author: new FormControl(""),
    id_state: new FormControl(""),
    vat_rate: new FormControl(""),
    total_duty_free: new FormControl(""),
    image: new FormControl("")
  })
  companies: Company[] = []
  isLoggedIn: boolean = false
  submitted: boolean = false

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
    }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken()

    if (!this.isLoggedIn) {
      this.router.navigate(["connexion"])
    } else {
      this.setTitle('Ajouter facture')
      this.headerService.pageName = "Ajouter facture"
      this.getAllCompanies()

      this.form = this.formBuilder.group(
        {
          name: ['', [Validators.required, Validators.maxLength(20)]],
          comment: ['', []],
          id_customer: ['', [Validators.required]],
          id_vendor: ['', [Validators.required]],
          id_author: ['', [Validators.required]],
          id_state: ['', Validators.required],
          vat_rate: [0, [Validators.required]],
          total_duty_free: ['', [Validators.required]],
          image: ['', [Validators.required, Validators.maxLength(255)]],
        }
      )
    }
  }

  getAllCompanies() {
    this.companiesService.getAllCompanies()
      .subscribe(companies => this.companies = companies)
  }

  addLine() {

  }

  deleteLine() {
    
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls
  }

  onSubmit(is_draft) {

    if (this.form.invalid) {
      return
    }
    this.submitted = true

    if(is_draft === 0) {
      this.form.value.id_state = 2
    } else {
      this.form.value.id_state = 1
    }

    // this.usersService.postUser(JSON.stringify(this.form.value, null, 2)).subscribe((res) => {
    //   this.reloadPage()
    // })
  }

  onReset() {
    this.submitted = false
    this.form.reset()
    this.getAllCompanies()
  }

  back() {
    this.location.back()
  }

}
