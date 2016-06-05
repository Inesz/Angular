import { Component, Input, OnInit } from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';
import { bootstrap }        from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LoginService } from './login.service';
import { MainService } from '../main.service';

@Component({
    templateUrl: './app/login/login.template.html',
    providers: [ LoginService ]
})

export class LoginComponent implements OnInit { 
    
constructor(private loginService: LoginService, public mainService : MainService, private router:Router) { }
    
    public login : string = "";
    public msgNotFree: string = "";
    
    ngOnInit() { }
    
    checkLogin(){
        this.loginService.checkLogin(this.login).subscribe(ifFree => {
            console.log(ifFree);
            
        if (ifFree === 0){
            this.mainService.setLogin(this.login);
        console.log( this.mainService.getLogin());
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



