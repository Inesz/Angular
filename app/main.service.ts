import { Injectable }     from '@angular/core';

@Injectable()
export class MainService {
    
    constructor () {}
    
    public login : string;
    public mode : number;
    
    getLogin () : string {
        return this.login;
    }
    
    setLogin ( login : string ) : void {
        this.login = login;
    }
    
    getMode () : number {
        return this.mode;
    }
    
    setMode ( mode : number ) : void {
        this.mode = mode;
    }
}