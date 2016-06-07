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
    public moves : number = 0;
    public defPicture : string = "";
    public firstPicture : number;
    errorMessage: string;
    private preventDefault : number[] = [];
    private wait : number = 0;
    
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
                this.defPicture = data.img;
                $("img:nth-child(1)").attr("src", data.img);
            });
    }
    
    
    getPicture(id : number){
        //unbind if mach
        if(this.preventDefault.indexOf(id)!==-1) return;
        //if clicked the same object
        if(this.firstPicture===id && this.moves%2 === 1) return;
        //pause before the next move
        if(this.wait === 1) return;
            
        this.gameService.getPicture(this.login, this.mainService.getMode(), id).subscribe( 
            data => {
                console.log(data);
                ++this.moves;
                
                $("#"+id+" img:nth-child(1)").attr("src", data.img);
                
                if(this.moves%2 === 0){
                    console.log("druga karta");
                    if ( data.score === "win" || data.score === "hit" ){
                        this.preventDefault.push(id);
                        this.preventDefault.push(this.firstPicture);
                        
                        if( data.score === "win" )
                            alert("Brawo ! Odnalazłeś wszystkie pary w "+ this.moves/2 + " ruchach :)");
                    }
                    if (data.score === "fail"){
                        this.wait = 1;
                        setTimeout(() => {
                        this.wait = 0;
                        $("#"+id+" img:nth-child(1)").attr("src", this.defPicture);
                        $("#"+this.firstPicture+" img:nth-child(1)").attr("src", this.defPicture);
                        },1000);
                    }
                }else{
                    this.firstPicture = id;
                }
            });
    }
    
}