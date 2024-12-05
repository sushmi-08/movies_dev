import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { error } from 'console';
import { GetallmoviesService } from 'src/app/services/getallmovies/getallmovies.service';
import { CLIENT_RENEG_LIMIT } from 'tls';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() image_url: string = '';
  @Input() title: string = '';
  @Input() director: string = '';
  @Input() cast: string[] = [];
 @Input() description:string='';
 @Input() movieId:string = '';
 @Input() isAvailable:boolean=true;
 isExpanded: boolean = false;  
 userId:any;
user:any;
allMovieIds:any[]=[];
allMovies:any[] = [];
constructor(private movie:GetallmoviesService, private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    console.log(this.isAvailable)

  }

  toogleCard(){
    this.isExpanded = !this.isExpanded;
  }

  
  handleBtnClick(){
    this.user = localStorage.getItem('user');

    console.log("this.user",this.user);

    if(this.user){
      this.user = JSON.parse(this.user)
      this.userId = this.user._id;
      console.log("btn clicked",this.user._id, this.movieId);

      this.movie.setMovieRented(this.movieId,this.userId).subscribe((response)=>{
        console.log("movie rental success", response.user_data.rented_movies);
       this.isAvailable = response.movie_data.availability;
        const rentedMovies = response.user_data.rented_movies;
       this.movie.setRentedMovies(rentedMovies);
       
       console.log("this.isAvailable",this.isAvailable);
      sessionStorage.setItem("rentedMovies",response.user_data.rented_movies);

      
       
        
      },
    (error)=>{
      console.log("Error renting movie", error);
      
    });
    }else{
      console.log('user data not found in local storage');
      
    }
    
   
  }
}
