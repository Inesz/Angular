import { Component, OnInit } from '@angular/core';
import { GameService }       from './game.service';

@Component({
    templateUrl: './app/game/game.template.html',
    providers: [ GameService ]
})

export class GameComponent implements OnInit { 

    constructor(private gameService: GameService) {
      console.log("game"); 
    }
    
    errorMessage: string;
    
  ngOnInit() {
      this.getGame();
  }
    
    getGame(){
        this.gameService.getGame().subscribe();
    }
    
}