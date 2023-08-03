import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderService } from 'src/app/layout/header/header.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'

import { User } from './user';
import { UsersService } from './users.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { UserRole } from './user-role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: User[] = []
  userRoles: UserRole[] = []
  totalUsers: number = 0
  color: string = ""
  isLoggedIn: boolean = false
  isUserRoleSuperAdmin: boolean = false
  submitted: boolean = false
  FeedBack!: FormGroup

  constructor(
    private titleService: Title,
    private headerService: HeaderService,
    private usersService: UsersService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
    this.headerService.pageName = "Utilisateurs"
  }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken()
    this.isUserRoleSuperAdmin = this.checkUserRole()

    if (!this.isLoggedIn) {
      this.router.navigate(["connexion"])
    } else {
      if (this.isUserRoleSuperAdmin) {
        this.setTitle('Utilisateurs')

        this.getAllUsers()
        this.getAllRoles()
        this.getTotalUsers()

        this.createContactForm()
      }
      else {
        this.router.navigate(["/"])
      }
    }
  }

  //getter function ease up to get the form controls
  get formArr() {
    return this.FeedBack.get('Users') as FormArray;
  }

  createContactForm() {
    this.FeedBack = this.formBuilder.group({
      Users: this.formBuilder.array([])
    })
  }

  addUser(user) {
    return this.formBuilder.group({
      id: [user.id],
      civ: [user.civ, [Validators.required]],
      firstname: [user.firstname, [Validators.required, Validators.maxLength(20)]],
      lastname: [user.lastname, [Validators.required, Validators.maxLength(20)]],
      email: [user.email, [Validators.required, Validators.email, Validators.maxLength(100)]],
      id_role: [user.id_role, [Validators.required]],
      createdAt: [user.createdAt],
      updatedAt: [user.updatedAt]
    })
  }

  getAllUsers() {
    this.usersService.getAllUsers()
      .subscribe(users => {
        users.map(user => {
          this.formArr.push(this.addUser(user),
          )
        })
      })
  }

  getTotalUsers() {

    this.usersService.getTotalUsers()
      .subscribe(totalUsers => this.totalUsers = totalUsers)
  }

  getAllRoles() {
    this.usersService.getAllRoles()
      .subscribe(userRoles => this.userRoles = userRoles)
  }

  checkUserRole(): boolean {

    if (this.tokenStorageService.getUser().id_role === 1)
      return true
    else {
      return false
    }
  }

  onSubmit() {

    // console.log(this.formArr.controls);
    
    if (this.formArr.invalid) {
      console.log("error");
    } else {
      console.log("ok");
    }
    this.submitted = true
    // this.usersService.updateUser(JSON.stringify(this.form.value, null, 2)).subscribe((res) => {
    //   this.reloadPage()
    // })
  }

  reloadPage(): void {
    window.location.reload()
  }

  onSave(i) {

    alert("Bonjour" + i)
  }
}