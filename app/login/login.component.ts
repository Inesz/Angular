import { Component, Input, OnInit } from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import { bootstrap }        from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LoginService } from './login.service';

@Component({
    templateUrl: './app/login/login.template.html',
    providers: [ LoginService ]
})

export class LoginComponent implements OnInit { 
    
    constructor(private loginService: LoginService, private router:Router) { }
    
    public login : string = "";
    public msgNotFree: string = "";
    
    ngOnInit() { }
    
    checkLogin(){
        this.loginService.checkLogin(this.login).subscribe(ifFree => {
            console.log(ifFree);
            
        if (ifFree === 0){
            this.msgNotFree = "";
            this.login = "";
             this.router.navigate(['/games']);
        }else{
            this.login = "";
            this.msgNotFree = "login zajęty";
        }
        });

    }
}



