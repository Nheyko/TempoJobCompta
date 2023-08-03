import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { Users } from './users';

import { UserRole } from './user-role';
import { UserRoles } from './user-roles';

import { HandleError } from '../interceptors/handle-error';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private usersUrl = 'http://localhost:8080/api/users'
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {

    return this.http.get<Users>(this.usersUrl)
    .pipe(
      map(res => res.users),
      tap(_ => HandleError.log('UserService: Fetched users')),
      catchError(HandleError.handleError<User[]>('getAllUsers', []))
    )
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<Users>(this.usersUrl + "/total")
    .pipe(
      // tap(res => console.log(res)),
      map(res => res.totalUsers),
      // tap(res => console.log(res)),
      tap(_ => HandleError.log('UserService: Fetched total users')),
      catchError(HandleError.handleError<number>('getTotalUsers'))
    )
  }

  getAllRoles(): Observable<UserRole[]> {

    return this.http.get<UserRoles>(this.usersUrl + "/roles")
    .pipe(
      map(res => res.userRoles),
      tap(_ => HandleError.log('UserService: Fetched roles')),
      catchError(HandleError.handleError<UserRole[]>('getAllRoles', []))
    )
  }

  postUser(data: string): Observable<Object> {
    return this.http.post(`${this.usersUrl + "/create"}`, data)
  }

}
