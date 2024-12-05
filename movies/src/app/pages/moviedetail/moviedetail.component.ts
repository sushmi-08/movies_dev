import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetallmoviesService } from 'src/app/services/getallmovies/getallmovies.service';

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.css']
})
export class MoviedetailComponent implements OnInit {
movieId:string='';
movie:any={};
  constructor(private route:ActivatedRoute,private moviesService:GetallmoviesService) { }

  ngOnInit(): void {
    // this.movieId = this.route.snapshot.paramMap()

    this.route.paramMap.subscribe((params) => {
      this.movieId = params.get('id')!;  // 'id' is the route parameter name
      console.log('Movie ID:', this.movieId);
    });

    this.moviesService.getMovieById(this.movieId).subscribe((response)=>{
      this.movie = response.data;
    })

  }
  }


