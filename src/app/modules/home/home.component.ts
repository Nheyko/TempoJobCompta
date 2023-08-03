import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/layout/header/header.service';
import { TokenStorageService } from '../auth/token-storage.service';

import { Invoice } from '../invoices/invoice';
import { InvoicesService } from '../invoices/invoices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false
  invoices: Invoice[] = []
  draft: number = 0;
  waiting: number = 0;
  validated: number = 0;
  refused: number = 0;

  constructor(
    private invoicesService: InvoicesService,
    private headerService: HeaderService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  getAllInvoices() {
    this.invoicesService.getAllInvoices()
      .subscribe(invoices => {
        invoices.map(invoice => {
          if (invoice.id_state === 1)
            this.draft++
          if (invoice.id_state === 2)
            this.waiting++
          if (invoice.id_state === 3)
            this.validated++
          if (invoice.id_state === 4)
            this.refused++
        })
        this.invoices = invoices
      })
  }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken()

    if (!this.isLoggedIn) {
      this.router.navigate(["connexion"])
    } else {
      this.getAllInvoices()
      this.headerService.pageName = "Statistiques"
    }
  }
}
