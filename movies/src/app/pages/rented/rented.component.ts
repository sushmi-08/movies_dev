import { GetallmoviesService } from 'src/app/services/getallmovies/getallmovies.service';

import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-rented',
  templateUrl: './rented.component.html',
  styleUrls: ['./rented.component.css']
})
export class RentedComponent implements OnInit {

  rentedMovies: any = []
  api = inject(GetallmoviesService)
  constructor() { }

  ngOnInit(): void {
    this.api.getAllMovies().subscribe((response) => {
      if (response.result && response.data) {
        this.rentedMovies = response.data.filter((movie: any) => movie.availability === false);
      }
    })
  }

}
