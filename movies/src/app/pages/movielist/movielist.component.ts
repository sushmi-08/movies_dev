import { Component, OnInit } from '@angular/core';
import { GetallmoviesService } from 'src/app/services/getallmovies/getallmovies.service';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { CardComponent } from "../../common/card/card.component";
import { log } from 'console';
import { debounceTime, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
 
})
export class MovielistComponent implements OnInit {
  movies:any[]=[];
  filteredMovies:any[]=[];
  selectedCategory:string='';
  showDropdown: boolean = false;
  searchTerm:string = '';
  searchTermSubject: Subject<string> = new Subject<string>();
  

  constructor(private movieService:GetallmoviesService, private route:Router) { }
  
  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe(response=>{
      // console.log("response from getallmovies",response);
      this.movies = response.data;

      console.log("movies",this.movies);
      
    })

    this.searchTermSubject.pipe(debounceTime(300)).subscribe(() => {
      this.filterMoviesByCategory();
    });
  }

  onSearchTermChange(){
    this.searchTermSubject.next(this.searchTerm);
  }

  filterMoviesByCategory():void{

    if(this.searchTerm){
      this.movieService.getMovieByCategory(this.searchTerm.toLowerCase()).subscribe(response=>{
        if(response.result){
          this.filteredMovies = response.data;
          console.log("filteredMovies",this.filteredMovies);
          
        }else{
          console.error('Failed to filter movies:', response.message);
        }
      })
    }
  }

  selectMovie(movie: any): void {
    this.searchTerm = movie.name; // Set the search term to the selected genre
    this.filteredMovies = []; // Hide the dropdown after selection
    // Optionally, navigate to the selected movie details or perform any action
    this.route.navigate([`/moviedetail/${movie._id}`]);
  }


  toggleGenreDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
