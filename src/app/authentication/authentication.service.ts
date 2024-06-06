import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from '../message.service';
import { AccessToken } from './access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private endpoint = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient,  private messageService: MessageService) { }

  private log(message: String){
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T> => {      
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T)	
    };
  }

  login(payload: Login): Observable<AccessToken>{
    return this.http.post<AccessToken>(`${this.endpoint}/login`, payload).
    pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<AccessToken>('postLogin')
    ));
  }
}
