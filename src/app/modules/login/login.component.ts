import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { HeaderService } from 'src/app/layout/header/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  })
  submitted: boolean = false
  isLoggedIn: boolean = false
  isLoginFailed: boolean = false
  errorMessage: string = ""

  constructor(
    private titleService: Title,
    private headerService: HeaderService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
    this.headerService.pageName = "Login"
  }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken()

    if (this.isLoggedIn) {
      this.router.navigate(['/'])

    } else {
      this.setTitle('Connexion')

      this.form = this.formBuilder.group(
        {
          email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
          password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
        }
      )
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls
  }

  onSubmit(): void {
    this.submitted = true
    this.authService.login(this.form.controls["email"].value, this.form.controls["password"].value).subscribe({
      next: data => {
        this.tokenStorageService.saveToken(data.accessToken)
        this.tokenStorageService.saveUser(data)
        this.isLoginFailed = false
        this.isLoggedIn = true
        this.reloadPage()
      },
      error: err => {
        this.errorMessage = err.error.message
        this.isLoginFailed = true
      }
    })
    if (this.form.invalid) {
      return
    }
  }

  closeForgotPassword() {
    let popup = document.getElementById("lostPasswordPopup")

    popup.style.height = "0"
    popup.style.overflow = "hidden"
  }

  sendEmail() {

    this.closeForgotPassword()
  }

  showForgotPassword() {
    let popup = document.getElementById("lostPasswordPopup")

    popup.style.height = "auto"
    popup.style.overflow = "initial"
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
}
