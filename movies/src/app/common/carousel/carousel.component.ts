import { GetallmoviesService } from 'src/app/services/getallmovies/getallmovies.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  movies: any[] = [];
  currentIndex = 0;

  constructor(private movieService: GetallmoviesService) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.autoSlide();
  }

  fetchMovies() {
    this.movieService.getRandom().subscribe((response) => {
      if (response.result && response.data) {
        this.movies = response.data;
      }
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.movies.length;
  }

  previousSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.movies.length) % this.movies.length;
  }

  autoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

}
