import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  constructor(private titleService: Title) { 
    
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
  }

  ngOnInit(): void {
    this.setTitle('Factures')
  }

}
