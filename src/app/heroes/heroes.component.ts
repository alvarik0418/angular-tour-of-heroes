import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location, NgFor, NgIf, UpperCasePipe } from '@angular/common';

import { Hero } from './hero';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroService } from './hero.service';
import { MessageService } from '../message.service';
import { RouterLink, RouterModule } from '@angular/router';
import { PowersService } from '../powers/powers.service';

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
  heroesT: Hero[] = [];
  selectedHero?: Hero

  constructor(private heroService: HeroService, 
              private powerService: PowersService,
              private messageService: MessageService, 
              private location: Location)

  {}

  ngOnInit(): void {
    this.getHeroes();
    this.messageService.getMessages();
  }

  onSelect(hero: Hero):void{
    this.selectedHero = hero
    this.messageService.add(`HeroesComponent: selected hero id ${this.selectedHero.id}`)
  }

  getHeroes(): void {
      //this.heroService.gerHeroes().subscribe(heroes => this.heroes = heroes);
      this.heroService.gerHeroes().subscribe(heroes => 
        {
          heroes.map((hero) => {
            this.powerService.getPower(hero.id).subscribe(
              power => {
              hero.powerName = power.name
            });
          });
          this.heroes = heroes;
        });      
    }

  gotoBack(): void {
    this.location.back();
  }
}
