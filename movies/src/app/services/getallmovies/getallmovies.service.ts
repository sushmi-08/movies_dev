import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetallmoviesService {

  private rentedMoviesSubject = new BehaviorSubject<string[]>([]);

  rentedMovies$ = this.rentedMoviesSubject.asObservable();

  constructor(private http: HttpClient) { }

  setRentedMovies(rentedMovies: string[]): void {
    this.rentedMoviesSubject.next(rentedMovies);
  }

  getAllMovies(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/movies/allMovies')
  }

  getMovieByCategory(category:any):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/movies/category/${category}`)
  }

  setMovieRented(movieId:any,userId:any):Observable<any>{
    return this.http.post(`http://localhost:5000/movies/rent-movie/${movieId}`,{userId});
  }

  resetMovieRented(movieId:any,userId:any):Observable<any>{
    return this.http.post(`http://localhost:5000/movies/reset-movie/${movieId}`,{userId});
  }

  getMovieById(movieId:any):Observable<any>{
    return this.http.get(`http://localhost:5000/movies/${movieId}`)
  }

  isMovieRented(movieId: string): boolean {
    const rentedMovies = this.rentedMoviesSubject.getValue();
    return rentedMovies.includes(movieId);
  }

  getRandom(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/movies/random/5');
  }
}
