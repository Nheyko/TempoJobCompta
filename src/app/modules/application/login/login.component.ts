import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private titleService: Title) { 
    this.user.email = "a@a.com",
    this.user.password = "abcdef";
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
  }

  ngOnInit(): void {
    this.setTitle('Connexion')
  }

}
