import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { Hero } from '../heroes/hero';
import { HeroService } from '../heroes/hero.service';
import { ActivatedRoute } from '@angular/router';
import { HeroFormsGroup } from '../hero-forms-group';
import { HeroFormComponent } from '../hero-form/hero-form.component';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor,UpperCasePipe, ReactiveFormsModule, HeroFormComponent],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent {
  hero?:Hero

  constructor(private route: ActivatedRoute, 
              private heroService: HeroService)
  { }

  ngOnInit(): void {
      this.getHero();
  }

  getHero(): void{
    const id = Number(this.route.snapshot.paramMap.get('id')); 

    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
      });
  }
}
