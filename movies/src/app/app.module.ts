import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CardComponent } from './common/card/card.component';
import { MovielistComponent } from './pages/movielist/movielist.component';
import { MoviedetailComponent } from './pages/moviedetail/moviedetail.component';
import { RentedComponent } from './pages/rented/rented.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CardComponent,
    MovielistComponent,
    MoviedetailComponent,
    RentedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
