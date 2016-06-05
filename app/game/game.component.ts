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
    console.log( this.mainService.getMode());
    }
    
    public login : string = this.mainService.getLogin();
    public mode : number[] = [];
    errorMessage: string;
    
    ngOnInit() {
        this.initModeList();
        this.initGame(this.mainService.getLogin(), this.mainService.getMode());
    }
    
     
    initModeList(){
        let m : number = this.mainService.getMode();
        
        for(let i = 0; i < m; i++){
            this.mode[i]=i;
            this.mode[i + m]=i+m;
        }
    }
    
    initGame(login : string, mode : number){
        this.gameService.initGame(login, mode).subscribe( 
            data => {
                $("img").attr("src", data.img);
            });
    }
    
    getPicture(id : number){
        this.gameService.getPicture(this.login, this.mode, id).subscribe( 
            data => {
                //wyświetlanie do poprawy
                $("div:nth-child("+(id+1)+") img:nth-child(1)").attr("src", data.img);
                console.log(data);
            });
    }
    
}