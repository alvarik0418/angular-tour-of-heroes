import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroNewComponent } from './hero-new/hero-new.component';
import { authGuard } from './authentication/auth.guard';
import { LoginComponent } from './login/login.component';
import { NoFoundComponent } from './no-found/no-found.component';

export const routes: Routes = [
    { path:'', redirectTo:'/dashboard', pathMatch:'full' },
    { path:'heroes',
      component: HeroesComponent,
      canActivate: [authGuard] },
    { path:'heroes/new', component: HeroNewComponent},
    { path:'detail/:id', component: HeroDetailsComponent},
    { path:'dashboard', component:DashboardComponent},
    { path:'login', component:LoginComponent},
   // { path: '**', component: NoFoundComponent}
];
