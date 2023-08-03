import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser'
import { HeaderService } from 'src/app/layout/header/header.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common'

import Validation from '../../providers/Validation'
import { TokenStorageService } from '../auth/token-storage.service'

import { UserRole } from '../users/user-role';
import { UsersService } from '../users/users.service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userRoles: UserRole[] = []

  form: FormGroup = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    civ: new FormControl(""),
    email: new FormControl(""),
    id_role: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl("")
  })
  submitted: boolean = false
  isLoggedIn: boolean = false
  isUserRoleSuperAdmin: boolean = false

  constructor(
    private titleService: Title,
    private headerService: HeaderService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private location: Location
  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
  }

  ngOnInit(): void {
    
    this.isLoggedIn = !!this.tokenStorageService.getToken()
    this.isUserRoleSuperAdmin = this.checkUserRole()

    if(!this.isLoggedIn) {
      this.router.navigate(["connexion"])
    } else {
      if(this.isUserRoleSuperAdmin) {
        this.setTitle('Ajouter utilisateur')
        this.headerService.pageName = "Ajouter utilisateur"
        this.getAllRoles()

        this.form = this.formBuilder.group(
          {
            firstname: ['', [Validators.required, Validators.maxLength(20)]],
            lastname: ['', [Validators.required, Validators.maxLength(20)]],
            civ: ['', [Validators.required, ]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
            id_role: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
          },
          {
            validators: [Validation.match('password', 'confirmPassword')]
          }
        )
      } else {
        this.router.navigate(['/'])
      }
    }
  }

  getAllRoles() {
    this.usersService.getAllRoles()
      .subscribe(userRoles => this.userRoles = userRoles)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls
  }

  onSubmit() {

    if (this.form.invalid) {
      return
    }
    this.submitted = true
    this.usersService.postUser(JSON.stringify(this.form.value, null, 2)).subscribe((res) => {
      this.reloadPage()
    })
  }

  reloadPage(): void {
    window.location.reload()
  }

  checkUserRole(): boolean {

    if (this.tokenStorageService.getUser().id_role === 1)
      return true
    else {
      return false
    }
  }

  onReset(): void {
    this.submitted = false
    this.form.reset()
  }

  back(): void {
    this.location.back()
  }
}
