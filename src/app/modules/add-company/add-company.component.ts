import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'

import { CompanyCountry } from '../companies/company-country'
import { CompanyLegalStatus } from '../companies/company-legal-status'

import { CompaniesService } from '../companies/companies.service'
import { HeaderService } from 'src/app/layout/header/header.service'
import { TokenStorageService } from '../auth/token-storage.service'

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  companyLegalStatuses: CompanyLegalStatus[] = []
  companyCountries: CompanyCountry[] = []
  isLoggedIn: boolean = false
  isUserRoleSuperAdmin: boolean = false
  submitted: boolean = false

  form: FormGroup = new FormGroup({
    name: new FormControl(""),
    vat_number: new FormControl(""),
    siren_number: new FormControl(""),
    phone_number: new FormControl(""),
    other: new FormControl(""),
    legal_status: new FormControl(""),
    is_customer: new FormControl(""),
    adress: new FormControl(""),
    city: new FormControl(""),
    zipcode: new FormControl(""),
    country: new FormControl("")
  })

  constructor(
    private titleService: Title,
    private companiesService: CompaniesService,
    private headerService: HeaderService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls
  }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken()
    this.isUserRoleSuperAdmin = this.checkUserRole()

    if (!this.isLoggedIn) {
      this.router.navigate(["connexion"])
    } else {
      if (this.isUserRoleSuperAdmin) {
        this.setTitle('Ajouter entreprise')
        this.headerService.pageName = "Ajouter entreprise"
        this.getAllLegalStatutes()
        this.getAllCountries()

        this.form = this.formBuilder.group(
          {
            name: ['', [Validators.required, Validators.maxLength(20)]],
            vat_number: ['', [Validators.maxLength(20)]],
            siren_number: ['', [Validators.maxLength(20)]],
            phone_number: ['', [Validators.maxLength(10)]],
            other: ['', [Validators.maxLength(255)]],
            legal_status: ['', [Validators.required]],
            is_customer: ['', [Validators.required]],
            adress: ['', [Validators.required, Validators.maxLength(255)]],
            city: ['', [Validators.required, Validators.maxLength(255)]],
            zipcode: ['', [Validators.required, Validators.maxLength(5)]],
            country: ['', [Validators.required]],
          }
        )
      }
      else {
        this.router.navigate(['/'])
      }
    }
  }

  getAllLegalStatutes() {
    this.companiesService.getAllLegalStatutes()
      .subscribe(companyLegalStatuses => this.companyLegalStatuses = companyLegalStatuses)
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
    console.log(this.form.controls);
    
    if (this.form.invalid) {      
      return
    }
    this.submitted = true
    this.companiesService.postCompany(JSON.stringify(this.form.value, null, 2)).subscribe((res) => {
      this.reloadPage()
    })
  }

  reloadPage(): void {
    window.location.reload()
  }

  onReset(): void {
    this.submitted = false
    this.form.reset()
    this.getAllLegalStatutes()
    this.getAllCountries()
  }

  back(): void {
    this.location.back()
  }
}
