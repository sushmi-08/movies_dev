import { Component, OnInit } from '@angular/core';
import { GetallmoviesService } from 'src/app/services/getallmovies/getallmovies.service';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { CardComponent } from "../../common/card/card.component";
import { log } from 'console';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
 
})
export class MovielistComponent implements OnInit {
  movies:any[]=[];
  filteredMovies=[];
  selectedCategory:string='';
  showDropdown: boolean = false;

  constructor(private movieService:GetallmoviesService) { }
  
  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe(response=>{
      // console.log("response from getallmovies",response);
      this.movies = response.data;
      console.log("movies",this.movies);
      
    })
  }

  filterMoviesByCategory():void{

    if(this.selectedCategory){
      this.movieService.getMovieByCategory(this.selectedCategory).subscribe(response=>{
        if(response.result){
          this.filteredMovies = response.data;
        }else{
          console.error('Failed to filter movies:', response.message);
        }
      })
    }
  }

  toggleGenreDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
