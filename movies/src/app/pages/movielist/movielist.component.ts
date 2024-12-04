import { Component, OnInit } from '@angular/core';
import { GetallmoviesService } from 'src/app/services/getallmovies/getallmovies.service';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { CardComponent } from "../../common/card/card.component";

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
 
})
export class MovielistComponent implements OnInit {

  constructor(private movieService:GetallmoviesService) { }
   movies:any[]=[];
  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe(response=>{
      // console.log("response from getallmovies",response);
      this.movies = response.data;
      console.log("movies",this.movies);
      
    })
  }

}
