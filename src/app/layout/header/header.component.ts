import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/modules/auth/token-storage.service';
import { HeaderService } from './header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isLoggedIn: boolean = false
  isUserRoleSuperAdmin: boolean = false
  currentPage = 1

  constructor(
    public headerService: HeaderService,
    private tokenStorageService: TokenStorageService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken()
    if(this.isLoggedIn)
      this.isUserRoleSuperAdmin = this.checkUserRole()
    }
  
  logout(): void {
    this.tokenStorageService.signOut()
    this.isLoggedIn = false
    this.router.navigate(['connexion'])
  }

  checkUserRole(): boolean {

    if(this.tokenStorageService.getUser().id_role === 1)
      return true
    else {
      return false
    }
  }
}
