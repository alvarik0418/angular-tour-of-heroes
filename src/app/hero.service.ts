import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  gerHeroes(): Observable<Hero[]>{
    const heroes = of(HEROES); //Convierte una constante en observable
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
}
