import { Component } from '@angular/core';
import { HeroFormComponent } from '../hero-form/hero-form.component';

@Component({
  selector: 'app-hero-new',
  standalone: true,
  imports: [HeroFormComponent],
  templateUrl: './hero-new.component.html',
  styleUrl: './hero-new.component.css'
})
export class HeroNewComponent {

}
