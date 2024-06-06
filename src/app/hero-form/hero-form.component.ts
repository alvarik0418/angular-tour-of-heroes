import { Location, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroFormsGroup } from '../hero-forms-group';
import { PowersService } from '../powers/powers.service';
import { Power } from '../powers/power';
import { Hero } from '../heroes/hero';
import { HeroNew, HeroService } from '../heroes/hero.service';



@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor,UpperCasePipe, ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent extends HeroFormsGroup {
  @Input() hero?: Hero;
  powers: Power[] = []

  constructor(
    private powerService: PowersService, 
    private heroService: HeroService, 
    private location: Location){
    super();
  }

  ngOnInit(): void {
    this.getPowers();

    if(this.hero){
      this.heroFormsGroup.patchValue(this.hero);
    }
  }

  getPowers(): void {
    this.powerService.getAll().subscribe(powers => this.powers = powers);
  }

  onSubmit(): void {
    if (this.heroFormsGroup.valid && !this.heroFormsGroup.pristine){
      if(this.hero){
        const heroFull = {
          id: this.hero?.id,
          ... this.heroFormsGroup.value
        } as Hero; 

        this.heroService.updateHero(heroFull).subscribe(() => this.gotoBack());
      }
      else{
        const heroNew = this.heroFormsGroup.value as HeroNew
        this.heroService.createHero(heroNew).subscribe(() => this.gotoBack());;
      }      
    }
  }

  gotoBack(): void {
    this.location.back();
  }
}
