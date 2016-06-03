import { Component, OnInit } from '@angular/core';
import { OnActivate, Router, RouteSegment, RouteTree } from '@angular/router';
import { GameMode }       from './game.mode';
import { GameService } from './game.service';

@Component({
    templateUrl: './app/game/list.template.html',
    providers: [ GameService ]
})

export class ListComponent implements OnInit {
    public gameModes : GameMode[]=[{mode: 2}, {mode: 4}];
    
    constructor(private gameService: GameService, private router:Router) {
    }
    
    ngOnInit() {
      this.getModes();
    }
    
    getModes(){
        this.gameService.getModes().subscribe(gameModes => {this.gameModes = gameModes;});
}
    
    onSelect(size:number){
        this.router.navigate(['/game', size]);
    }

}