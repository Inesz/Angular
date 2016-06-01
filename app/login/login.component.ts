import { Component, Input, OnInit } from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, URLSearchParams} from '@angular/http';


import { bootstrap }        from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';


@Component({
  templateUrl: './app/login/login.template.html',
    providers: [HTTP_PROVIDERS, LoginComponent]
})

export class LoginComponent implements OnInit { 

    constructor() {
        console.log("asfasdfa"); 
    }
    
    ngOnInit(){    }
    
}
