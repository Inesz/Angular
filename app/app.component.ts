import { Component }            from '@angular/core';
import { bootstrap }            from '@angular/platform-browser-dynamic';
import { Routes, 
        Router, 
        ROUTER_PROVIDERS,
        ROUTER_DIRECTIVES} 
                                from '@angular/router';

import { provide }              from '@angular/core';
import { LocationStrategy,
         HashLocationStrategy } from '@angular/common';

import { PictureComponent }     from './picture/picture.component';
import { LoginComponent }     from './login/login.component';
import { ListComponent }     from './game/list.component';
import { GameComponent }        from './game/game.component';
import './rxjs-operators';
import { HTTP_PROVIDERS }    from '@angular/http';

@Component({
    selector: 'my-app',
    templateUrl: './app/menu.template.html',
    directives: [ ROUTER_DIRECTIVES ]
})

@Routes([
    {path: '/games', component: ListComponent},
    {path: '/game/:id', component: GameComponent},
    {path: '/picture', component: PictureComponent},
    {path: '/', component: LoginComponent},
    ])

export class AppComponent { }


bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);