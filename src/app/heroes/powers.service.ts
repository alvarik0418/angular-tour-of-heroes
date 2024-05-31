import { Injectable } from '@angular/core';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Power } from '../powers';

@Injectable({
  providedIn: 'root'
})
export class PowersService {

  private powerUrl: string = 'http://localhost:3000/powers';

  constructor(public http:HttpClient, private messageService: MessageService) { }

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

  getAll(): Observable<Power[]>{
    return this.http.get<Power[]>(this.powerUrl).pipe(
      tap(_ => this.log('fetched powers')),
      catchError(this.handleError<Power[]>('getPowers',[])
    ));
  }
}
