import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PowersComponent } from './powers/powers.component';

export const routes: Routes = [
    { path:'', redirectTo:'/dashboard', pathMatch:'full' },
    { path:'dashboard', component:DashboardComponent},
    { path:'heroes', component: HeroesComponent },
    { path:'powers', component:PowersComponent},
    { path: '**', component: DashboardComponent}
];
