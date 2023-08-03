import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderService } from 'src/app/layout/header/header.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Invoice } from './invoice';
import { InvoicesService } from './invoices.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { InvoiceState } from './invoice-state';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices: Invoice[] = []
  invoiceStates: InvoiceState[] = []

  color: string = "";
  isLoggedIn: boolean = false
  errorMsg: string = ""

  totalInvoices: number = 0
  currentPage: number = 0
  totalPage: number = 0

  page: Invoice[] = []
  pages: Array<Invoice[]> = []

  invoiceId: number = 0
  invoiceName: string = ""
  invoiceComment: string = ""

  constructor(
    private titleService: Title,
    private headerService: HeaderService,
    private invoicesService: InvoicesService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
    this.headerService.pageName = "Factures"
  }

  transformInt(pageNumber: any): number {

    return parseInt(pageNumber)
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken()

    if (!this.isLoggedIn) {
      this.router.navigate(["connexion"])
    } else {
      this.setTitle('Factures')
      this.getTotalInvoices()
      this.getAllInvoices()
      this.getAllStates()
      this.getCurrentPage()
    }
  }

  onChangePage(): void {

    let inputValue = parseInt((<HTMLInputElement>document.getElementById('inputPage')).value)

    if (inputValue > this.totalPage) {
      inputValue = this.totalPage
    }
    if (inputValue <= 1) {
      inputValue = 1
    }
    if (!inputValue) {
      inputValue = 1
    }


    this.setPage(inputValue - 1)
    this.router.navigate(['factures'], { queryParams: { currentPage: inputValue } })
  }

  setPage(page: number) {
    this.invoices = this.pages[page]
  }

  getCurrentPage() {
    this.route.queryParams
      .subscribe(params => {
        this.currentPage = params['currentPage']
        this.setPage(this.currentPage - 1)
        if (this.currentPage > this.totalPage) {
          this.router.navigate(['factures'], { queryParams: { currentPage: 1 } })
        }
      })
  }

  getAllInvoices() {

    let j = 0

    // this.invoicesService.getAllInvoices()
    //   .subscribe(invoices => this.invoices = invoices)

    this.invoicesService.getAllInvoices()
      .subscribe(invoices => {

        invoices.sort((a, b) => (a.id > b.id) ? 1 : -1)

        for (let i = 0; i < this.totalInvoices; i++) {
          this.page.push(invoices[i])
          j++
          if (j >= 5) {
            this.pages.push(this.page)
            this.page = []
            j = 0
          }
        }
        if (this.page.length != 0) {
          this.pages.push(this.page)
          this.page = []
        }
        console.log("getAllInvoicePage" ,this.page);
        console.log("getAllInvoicePages", this.pages[0]);

        this.setPage(0)
      })
  }

  getTotalInvoices() {

    this.invoicesService.getTotalInvoices()
      .subscribe(totalInvoices => {
        this.totalInvoices = totalInvoices
        this.totalPage = Math.ceil(this.totalInvoices / 5)
      })
  }

  getAllStates() {
    this.invoicesService.getAllStates()
      .subscribe(invoiceStates => this.invoiceStates = invoiceStates)
  }

  openCommentWindow(invoice: Invoice) {

    this.invoiceId = invoice.id
    this.invoiceName = invoice.name
    this.invoiceComment = invoice.comment

    let popup = document.getElementById("wrapper-comment-window")

    popup.style.width = "auto"
    popup.style.height = "auto"
    popup.style.overflow = "initial"
  }

  saveComment(invoiceId: number) {

    let invoiceComment = (<HTMLInputElement>document.getElementById("comment-window-textarea")).value

    this.invoicesService.updateComment(invoiceId, invoiceComment)
      .subscribe({
        next: () => {
          this.closeCommentWindow()
          this.reloadPage()
        },
        error: err => {
          this.errorMsg = err.error.message;
        }
      }
      )

  }

  reloadPage(): void {
    window.location.reload()
  }

  deleteComment() {
    this.openConfirmDeleteWindow()
  }

  openConfirmDeleteWindow() {

    let popup = document.getElementById("wrapper-delete-window")

    popup.style.width = "1000px"
    popup.style.height = "1000px"
    popup.style.overflow = "initial"

    this.closeCommentWindow()
  }

  confirmDelete(invoiceId: number) {

    this.invoicesService.deleteComment(invoiceId)
      .subscribe({
        next: () => {
          this.closeDeleteConfirmWindow()
          this.reloadPage()
        },
        error: err => {
          this.errorMsg = err.error.message;
        }
      }
      )
  }

  closeDeleteConfirmWindow() {

    let popup = document.getElementById("wrapper-delete-window")

    popup.style.height = "0"
    popup.style.width = "0"
    popup.style.overflow = "hidden"

    this.invoiceId = 0
    this.invoiceName = ""
    this.invoiceComment = ""
  }

  closeCommentWindow() {

    let popup = document.getElementById("wrapper-comment-window")

    popup.style.height = "0"
    popup.style.width = "0"
    popup.style.overflow = "hidden"
  }

}
