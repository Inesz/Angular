import { Component }            from '@angular/core';
import { bootstrap }            from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS, Routes, ROUTER_DIRECTIVES} 
                                from '@angular/router';

import { provide }              from '@angular/core';
import { LocationStrategy,
         HashLocationStrategy } from '@angular/common';

import { GameComponent }        from './game/game.component';
import { PictureComponent }     from './picture/picture.component';

@Component({
      selector: 'my-app',
      templateUrl: './app/menu.template.html',
    //providers:  [DialogService, HeroService],
      directives: [ROUTER_DIRECTIVES]
    })

@Routes([
      {path: '/game',  component: GameComponent},
      {path: '/picture',  component: PictureComponent},
      {path: '*', component: AppComponent},
    ])

export class AppComponent { }

bootstrap(AppComponent, [
      ROUTER_PROVIDERS,
      provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
