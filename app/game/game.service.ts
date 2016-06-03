import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { GameMode } from './game.mode';

@Injectable()
export class GameService {
    
    constructor (private http: Http) {}
    
getGame (): Observable<number[]> {
        console.log("gameService");
            return this.http.get('/game/10').map(this.extractData).catch(this.handleError);
    }
    
    getModes (): Observable<GameMode[]> {
        console.log("getModels");
            return this.http.get('/game').map(this.extractData).catch(this.handleError);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
    
    private handleError (error: any) {
         console.log("handleError");
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
    }
}