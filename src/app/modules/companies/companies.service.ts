import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Company } from './company';
import { Companies } from './companies';

import { CompanyCountry } from './company-country';
import { CompanyCountries } from './company-countries';

import { CompanyLegalStatus } from './company-legal-status';
import { CompanyLegalStatutes } from './company-legal-statutes';

import { HandleError } from '../interceptors/handle-error';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private companiesUrl = 'http://localhost:8080/api/companies'
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getAllCompanies(): Observable<Company[]> {

    return this.http.get<Companies>(this.companiesUrl, this.httpOptions)
    .pipe(
      map(res => res.companies),
      tap(_ => HandleError.log('CompaniesService: Fetched companies')),
      catchError(HandleError.handleError<Company[]>('getAllCompanies', []))
    )
  }

  getAllLegalStatutes(): Observable<CompanyLegalStatus[]> {

    return this.http.get<CompanyLegalStatutes>(this.companiesUrl + "/legal-statutes", this.httpOptions)
    .pipe(
      map(res => res.companyLegalStatutes),
      tap(_ => HandleError.log('CompaniesService: Fetched legal statutes')),
      catchError(HandleError.handleError<CompanyLegalStatus[]>('getAllLegalStatutes', [])),
    )
  }

  getAllCountries(): Observable<CompanyCountry[]> {

    return this.http.get<CompanyCountries>(this.companiesUrl + "/countries", this.httpOptions)
    .pipe(
      map(res => res.companyCountries),
      tap(_ => HandleError.log('CompaniesService: Fetched countries')),
      catchError(HandleError.handleError<CompanyCountry[]>('getAllCountries', []))
    )
  }

  postCompany(data: string): Observable<Object> {
    return this.http.post(`${this.companiesUrl + "/create"}`, data)
  }

  updateCompany() {

  }

  deleteCompany() {
    
  }
}
