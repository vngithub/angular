import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService:HeroService) { }

  ngOnInit() {
  	this.getHeroes();
  }

  hero:Hero = {
  	id:1,
  	name:'Windstrom'
  };

  heroes: Hero[];
  
  getHeroes():void{
  	this.heroService.getHeroes().subscribe(heroes => this.heroes=heroes);
  }
}
