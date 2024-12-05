import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MoviedetailComponent } from './pages/moviedetail/moviedetail.component';
import { MovielistComponent } from './pages/movielist/movielist.component';
import { RentedComponent } from './pages/rented/rented.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'movielist', component: MovielistComponent},
  {path: 'moviedetail/:id', component: MoviedetailComponent},
  {path: 'rented', component: RentedComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
