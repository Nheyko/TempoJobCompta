import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderService } from 'src/app/layout/header/header.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isLoggedIn: boolean = false
  isUserRoleSuperAdmin: boolean = false

  constructor(
    private titleService: Title,
    private headerService: HeaderService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken()
    this.isUserRoleSuperAdmin = this.checkUserRole()

    if (!this.isLoggedIn) {
      this.router.navigate(["connexion"])
    } else {
      if (this.isUserRoleSuperAdmin) {
        this.setTitle('Admin')
        this.headerService.pageName = "Admin"
      } else {
        this.router.navigate(['/'])
      }
    }
  }

  checkUserRole(): boolean {

    if (this.tokenStorageService.getUser().id_role === 1)
      return true
    else {
      return false
    }
  }

}
