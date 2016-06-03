import { Component, Input, OnInit } from '@angular/core';

import { bootstrap }        from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';


@Component({
    templateUrl: './app/login/login.template.html',
})

export class LoginComponent implements OnInit { 

    constructor() {
        console.log("asfasdfa"); 
    }
    
    ngOnInit(){    }
}
