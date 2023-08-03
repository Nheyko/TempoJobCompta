import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'

import { Company } from './company';
import { CompaniesService } from './companies.service';
import { HeaderService } from 'src/app/layout/header/header.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { CompanyLegalStatus } from './company-legal-status';
import { CompanyCountry } from './company-country';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Company[] = []
  company_legal_statutes: CompanyLegalStatus[] = []
  companyCountries: CompanyCountry[] = []
  submitted: boolean = false

  isLoggedIn: boolean = false
  isUserRoleSuperAdmin: boolean = false

  FeedBack!: FormGroup

  constructor(
    private titleService: Title,
    private headerService: HeaderService,
    private companiesService: CompaniesService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
  }

  get formArr() {
    return this.FeedBack.get('Companies') as FormArray;
  }

  createContactForm() {
    this.FeedBack = this.formBuilder.group({
      Companies: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken()
    this.isUserRoleSuperAdmin = this.checkUserRole()

    if (!this.isLoggedIn) {
      this.router.navigate(["connexion"])
    } else {
      if (this.isUserRoleSuperAdmin) {
        this.setTitle('Entreprises')
        this.headerService.pageName = "Entreprises"
        this.getAllLegalStatutes()
        this.getAllCountries()
        this.getAllCompanies()

        this.createContactForm()

      }
      else {
        this.router.navigate(["/"])
      }
    }
  }

  addCompany(company) {
    return this.formBuilder.group({
      id: [company.id],
      name: [company.name ,[Validators.required, Validators.maxLength(20)]],
      vat_number: [company.vat_number, [Validators.maxLength(20)]],
      siren_number: [company.siren_number, [Validators.maxLength(20)]],
      phone_number: [company.phone_number, [Validators.maxLength(10)]],
      other: [company.other, [Validators.maxLength(100)]],
      id_legal_status: [company.id_legal_status, [Validators.required]],
      is_customer: [company.is_customer, [Validators.required]],
      adress: [company.adress, [Validators.required, Validators.maxLength(255)]],
      city: [company.city, [Validators.required, Validators.maxLength(255)]],
      zipcode: [company.zipcode, [Validators.required, Validators.maxLength(5)]],
      id_country: [company.id_country, [Validators.required]],
      createdAt: [company.createdAt]
    })
  }

  getAllCompanies() {
    this.companiesService.getAllCompanies()
      .subscribe(companies => {
        companies.map(company => {
          this.formArr.push(this.addCompany(company),
          )
        })
      })
  }

  getAllLegalStatutes() {
    this.companiesService.getAllLegalStatutes()
      .subscribe(company_legal_statutes => this.company_legal_statutes = company_legal_statutes)
  }

  getAllCountries() {

    this.companiesService.getAllCountries()
      .subscribe(companyCountries => this.companyCountries = companyCountries)
  }

  checkUserRole(): boolean {

    if (this.tokenStorageService.getUser().id_role === 1)
      return true
    else {
      return false
    }
  }

  onSubmit() {
    console.log(this.formArr.controls);
    
    if (this.formArr.invalid) {
      return
    }
    // this.submitted = true
    // this.companiesService.updateCompany(JSON.stringify(this.form.value, null, 2)).subscribe((res) => {
    //   this.reloadPage()
    // })
  }

  onSave(i) {
    alert("Bonjour" + i)
  }

  onDelete() {

  }

  reloadPage(): void {
    window.location.reload()
  }
}
