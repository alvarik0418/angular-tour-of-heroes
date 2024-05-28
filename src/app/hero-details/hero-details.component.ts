import { Location, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor,UpperCasePipe, ],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent {
  hero?:Hero

  constructor(private route: ActivatedRoute, 
              private heroService: HeroService, 
              private location: Location)
  {  }

  ngOnInit(): void {
      this.getHero();
  }

  getHero(): void{
    const id = Number(this.route.snapshot.paramMap.get('id')); //Captura parametro de la url de la ruta

    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  save(): void {
    if (this.hero){
      this.heroService.updateHero(this.hero).subscribe(() => this.gotoBack());
    }
  }

  gotoBack(): void {
    this.location.back();
  }
}
