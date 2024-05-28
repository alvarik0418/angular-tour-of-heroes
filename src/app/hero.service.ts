import { Injectable } from '@angular/core';
import { Hero } from './hero';
//import { HEROES } from './mock-heroes';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private apiUrl: string = 'http://localhost:3000/heroes';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

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

  gerHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.apiUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[])
    ));
  }

  getHero(id: number): Observable<Hero>{
    const urlHeroId = `${this.apiUrl}/${id}`;
    return this.http.get<Hero>(urlHeroId).pipe(
      tap(_ => this.log(`fetched heroe id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id ${id}`)
    ));
  }

  updateHero(hero: Hero): Observable<any>{
    const urlHeroId = `${this.apiUrl}/${hero.id}`;

    return this.http.patch(urlHeroId, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated heroe id = ${hero.id}`)),
      catchError(this.handleError<any>(`update hero`)
    ));
  } 
}
