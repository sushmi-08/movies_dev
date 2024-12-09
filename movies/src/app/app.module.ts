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
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { CarouselComponent } from './common/carousel/carousel.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CardComponent,
    MovielistComponent,
    MoviedetailComponent,
    RentedComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
