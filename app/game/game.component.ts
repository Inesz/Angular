import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//import { bootstrap }        from '@angular/platform-browser-dynamic';

@Component({
  templateUrl: './app/game/game.template.html'
})

export class GameComponent implements OnInit { 

constructor(private router: Router) {
      console.log("game"); 
    }
    
  ngOnInit() {
    //let id = +this.routeParams.get('id');
    //this.heroService.getHero(id)
      //.then(hero => this.hero = hero);
  }
    
}

