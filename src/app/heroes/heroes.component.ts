import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';

import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    HeroDetailsComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes: Hero[] = [];
  selectedHero?: Hero

  constructor(private heroService: HeroService, private messageService: MessageService){}

  ngOnInit(): void {
    this.getHeroes();
    this.messageService.getMessages();
  }

  onSelect(hero: Hero):void{
    this.selectedHero = hero
    this.messageService.add(`HeroesComponent: selected hero id ${this.selectedHero.id}`)
  }

  getHeroes(): void {
      this.heroService.gerHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
