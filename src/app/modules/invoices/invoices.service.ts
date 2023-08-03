import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Invoice } from './invoice';
import { Invoices } from './invoices';
import { HandleError } from '../interceptors/handle-error';
import { InvoiceState } from './invoice-state';
import { InvoiceStates } from './invoice-states';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private invoiceUrl = 'http://localhost:8080/api/invoice'
  private invoicesUrl = 'http://localhost:8080/api/invoices'
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient,
    ) { }

  createInvoice() {

  }

  getInvoice(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(this.invoicesUrl, this.httpOptions)
  }

  getAllInvoices(): Observable<Invoice[]> {

    return this.http.get<Invoices>(this.invoicesUrl, this.httpOptions)
    .pipe(
      map(res => res.invoices),
      tap(_ => HandleError.log('InvoiceService: Fetched invoices')),
      catchError(HandleError.handleError<Invoice[]>('getAllInvoices', []))
    )
  }

  getAllStates(): Observable<InvoiceState[]> {

    return this.http.get<InvoiceStates>(this.invoicesUrl + "/states", this.httpOptions)
    .pipe(
      map(res => res.invoiceStates),
      tap(_ => HandleError.log('InvoiceService: Fetched states')),
      catchError(HandleError.handleError<Invoice[]>('getAllStates', []))
    )
  }

  getTotalInvoices(): Observable<number> {
    return this.http.get<Invoices>(this.invoicesUrl + "/total")
    .pipe(
      // tap(res => console.log(res)),
      map(res => res.totalInvoices),
      // tap(res => console.log(res)),
      tap(_ => HandleError.log('UserService: Fetched total invoices')),
      catchError(HandleError.handleError<number>('getTotalInvoices'))
    )
  }

  updateComment(id: number, comment: string) {
    return this.http.post(this.invoiceUrl + "/" + id + "/update_comment", {
      comment
    }, this.httpOptions)
  }

  deleteComment(id: number) {
    return this.http.post(this.invoiceUrl + "/" + id + "/delete_comment", this.httpOptions)
  }
}
