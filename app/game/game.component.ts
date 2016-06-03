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
      //this.getGame();
      this.getPicture();
  }
    
    getGame(){
        this.gameService.getGame("4").subscribe();
    }
    
      getPicture(){
        this.gameService.getPicture("2").subscribe(
data => {console.log(data);
//this.posts = data.data.children;}
console.log("uzupelnij picture");
        //angular.element(this.$document.querySelector('#photo'));
    document.querySelector( "#photo" ).src = data.img;
 
          });
      }
}