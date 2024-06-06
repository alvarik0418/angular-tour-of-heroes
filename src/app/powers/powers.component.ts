import { Component } from '@angular/core';
import { Power } from './power';
import { PowersService } from './powers.service';
import { Location, NgFor } from '@angular/common';

@Component({
  selector: 'app-powers',
  standalone: true,
  imports: [NgFor],
  templateUrl: './powers.component.html',
  styleUrl: './powers.component.css'
})
export class PowersComponent {
  powers: Power[] = [];

  constructor(private powerService: PowersService, private location: Location){}

  ngOnInit(): void {
    this.getPowers();
  }

  getPowers(): void {
    this.powerService.getAll().subscribe(powers => this.powers = powers); 
  }
  
  gotoBack(): void {
    this.location.back();
  }
}
