import { Component, OnInit } from '@angular/core';
import { GameService }       from './game.service';
import { MainService } from '../main.service';

@Component({
    templateUrl: './app/game/game.template.html',
    providers: [ GameService ]
})

export class GameComponent implements OnInit { 

    constructor(private gameService: GameService, private mainService: MainService) {
      console.log("game"); 
    }
    
    public login : string = this.mainService.getLogin();
    public mode : number = this.mainService.getMode();
    errorMessage: string;
    
    ngOnInit() {
      //this.getGame();
      this.getPicture();
        
    console.log(this.login);
    }
    
    getGame(){
        this.gameService.getGame("4").subscribe();
    }
    
    getPicture(){
        this.gameService.getPicture("2").subscribe( 
            data => {
                console.log(data);
                document.querySelector( "#photo" ).src = data.img;
          });
      }

}