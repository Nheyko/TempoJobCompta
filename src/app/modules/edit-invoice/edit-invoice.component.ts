import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderService } from 'src/app/layout/header/header.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Location } from '@angular/common';

import { Company } from '../companies/company';
import { Invoice } from '../invoices/invoice';

import { InvoicesService } from '../invoices/invoices.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { CompaniesService } from '../companies/companies.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {

  isLoggedIn: boolean = false
  companies: Company[] = []
  invoice: Invoice = null
  submitted: boolean = false

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
  }

  constructor(
    private titleService: Title,
    private headerService: HeaderService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private invoicesService: InvoicesService,
    private companiesService: CompaniesService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  form: FormGroup = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    civ: new FormControl(""),
    email: new FormControl(""),
    id_role: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl("")
  })

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken()

    if (!this.isLoggedIn) {
      this.router.navigate(["connexion"])
    } else {
      this.setTitle('Editer facture')
      this.headerService.pageName = "Editer facture"

      this.form = this.formBuilder.group(
        {
          name: ['', [Validators.required, Validators.maxLength(20)]],
          comment: ['', []],
          id_customer: ['', [Validators.required]],
          id_vendor: ['', [Validators.required]],
          id_author: ['', [Validators.required]],
          id_state: ['', [Validators.required]],
          vat_rate: ['', [Validators.required]],
          total_duty_free: ['', [Validators.required]],
          image: ['', [Validators.required, Validators.maxLength(255)]],
        }
      )
    }
  }

  addLine() {

  }

  deleteLine() {
    
  }

  getInvoice(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.invoicesService.getInvoice(id)
      .subscribe(invoice => this.invoice = invoice);
  }

  getAllCompanies() {
    this.companiesService.getAllCompanies()
      .subscribe(companies => this.companies = companies)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls
  }

  onSubmit() {

    if (this.form.invalid) {
      return
    }
    this.submitted = true
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
