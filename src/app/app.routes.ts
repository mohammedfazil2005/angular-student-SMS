import { Routes } from '@angular/router';
import { RecipesComponent } from './dummy/recipes/recipes.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'recipe',component:RecipesComponent}
];
