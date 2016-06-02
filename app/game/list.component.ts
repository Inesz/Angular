import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
//import { Router } from '@angular/router';
import { OnActivate, Router, RouteSegment, RouteTree } from '@angular/router';


@Component({
  templateUrl: './app/game/list.template.html',
})

export class ListComponent implements OnInit {
    public sizes = [4,6,8,10];
    
    constructor(private router:Router) {}

    ngOnInit() {}

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree): void {
  }
    
    onSelect(size:number){
        //przejście 
        console.log(size);
        this.router.navigate(['/games', size]);
    }
}

/*

import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { HeroListComponent }     from './heroes/hero-list.component';
import { HeroDetailComponent }   from './heroes/hero-detail.component';

import { DialogService }         from './dialog.service';
import { HeroService }           from './heroes/hero.service';

@Component({
  selector: 'my-app',
  template: `
    <h1 class="title">Component Router</h1>
    <nav>
      <a [routerLink]="['/crisis-center']">Crisis Center</a>
      <a [routerLink]="['/heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  providers:  [DialogService, HeroService],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/crisis-center',  component: CrisisCenterComponent},
  {path: '/heroes',  component: HeroListComponent},
  {path: '/hero/:id', component: HeroDetailComponent},
])
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/crisis-center']);
  }
}
*/
