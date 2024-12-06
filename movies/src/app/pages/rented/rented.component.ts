import { GetallmoviesService } from 'src/app/services/getallmovies/getallmovies.service';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rented',
  templateUrl: './rented.component.html',
  styleUrls: ['./rented.component.css'],

})
export class RentedComponent implements OnInit {

  movies: any[] = [];
  rentedMovies: any = []
  displayedColumns: string[] = ['name', 'start_date', 'end_date', 'category', 'language'];
  api = inject(GetallmoviesService)
  dataSource = new MatTableDataSource<Element>();
  constructor() { }

  ngOnInit(): void {
    this.api.getAllMovies().subscribe((response) => {
      if (response.result && response.data) {
        this.rentedMovies = response.data.filter((movie: any) => movie.availability === false);
      }
      console.log(this.rentedMovies,'rented movies');
      this.dataSource.data = this.rentedMovies
      
      // this.movies = response.data;

      // console.log("movies", this.movies);
    })

  }

}
