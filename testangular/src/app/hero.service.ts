import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {MessagesService} from './messages.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class HeroService {

  constructor( 
  private http: HttpClient,
  private messages:MessagesService
  ) { }
  getHeroes():Observable<Hero[]>{
    //this.messages.addMessage('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
	tap(heroes => this.log(`fetched heroes`)),
    catchError(this.handleError('getHeroes', []))
    )
  	//return of (HEROES);
  }

  getHero(id:number): Observable<Hero>{
	//this.messages.addMessage(`HeroService: fetched hero id=${id}`);
  	//return of(HEROES.find(hero => hero.id === id));
  	const url = `${this.heroesUrl}/${id}`;
  	return this.http.get<Hero>(url)
  	.pipe(
  		tap(_ => this.log(`fetched hero id=${id}`)),
  		catchError(this.handleGetHeroError<Hero>(`getHero id=${id}`,id))
  	)
  }
  /** Log a HeroService message with the MessageService */
	private log(message: string) {
    this.messages.addMessage('HeroService: ' + message);
}
	
	updateHero(hero:Hero): Observable<any>{
		return this.http.put(this.heroesUrl, hero, httpOptions)
		.pipe(
			catchError(this.handlePutError<any>('updateHero',hero))
		)

	}
	addHero(hero:Hero): Observable<any>{
		return this.http.put(this.heroesUrl, hero, httpOptions)
		.pipe(
			catchError(this.handlePutError<any>('updateHero',hero))
		)

	}
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<Hero[]> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.

    return of(HEROES);
  };
}

private handlePutError<T> (operation = 'operation',hero, result?: T) {
  return (error: any): Observable<any> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.

    return of(HEROES.push(hero));
  };
}

private handleGetHeroError<T> (operation = 'operation', id, result?: T) {
	return (error: any): Observable<Hero> => {


	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead

	    // TODO: better job of transforming error for user consumption
	    this.log(`${operation} failed: ${error.message}`);

	    // Let the app keep running by returning an empty result.
    	return of(HEROES.find(hero => hero.id === id));
    }
}

private heroesUrl = 'api/heroes'; 

}




