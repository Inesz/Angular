var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

/*
function login(login: string) {
    
    return "Hello, " + person;
}
*/

//---------------variables-----------------

enum checked {no, yes};
let picturesList: Array<number>;

interface Picture {
    name: number;
    correct: checked;
}

interface User {
    login: string;
    gameMode: number;
    gameChecked: number;    //game score
    gameTab: Picture[][];  
}

let usersList: Array<User>;

interface Location{
    x:number;
    y:number;
}

//---------------functions------------------

function initPicturesList():void{
    picturesList = [1,2,3,4,5];
}

function addToPicturesList(picture:number):void{
    picturesList.push(picture);
}

function findUserId(login:string):string{
    for (let id in usersList) {
        if(usersList[id].login == login) 
                return id;
    }
    return null;
}

function findUserObject(login:string):User{
     for (let user of usersList) {
          if(user.login == login) 
              return user;
    }
    return null;
}

function loginIfFree(login:string):checked{
    let user:Object = findUserObject(login);
    
    if(user==null){
        usersList.push({login:login} as User);
        return checked.yes; 
    }else
        return checked.no; 
}

function logout(login:string):void{
    let id:string = findUserId(login);
    //problem with converssion string<>number
    let i:number = usersList.indexOf(usersList[id]);
    usersList.splice(i, 1);
}

function initGameTab(gameMode:number):Picture[][]{
    let tempGameTab:Picture[][];
    let tempPicturesList = picturesList.slice();
    let tempLocationList: Array<Location>;
    let picture: number;
    let location: Location;
    let i: number,j: number,p: number,l: number;
    //init tempLocationList
    for (i = 0; i < gameMode; i++) {
        for (j = 0; j < gameMode; j++) {
            tempLocationList.push({x:i, y:j} as Location);
        }
    }  

    //init tempGameTab
    for(i=0; i < gameMode; i++){
        //rand picture
        let p:number = Math.floor(Math.random() * tempPicturesList.length); 

        if (p > -1) {
            picture = tempPicturesList[p];
            tempPicturesList.splice(p, 1);
        }

        //rand location
        for(j=0; j < 2; j++){
            let l:number = Math.floor(Math.random() * tempLocationList.length); 

            if (l > -1) {
                location = tempLocationList[l];
                tempLocationList.splice(l, 1);
            }

            //insert to tempGameTab
            tempGameTab[location.x][location.y] = {name: picture, correct: checked.no} as Picture;
        }
    }
    
    return tempGameTab;
}

function checkPicture(login:string, a:Location, b:Location):checked{
    let id:string = findUserId(login);
    
    if(usersList[id].gameTab[a.x][a.y].name == usersList[id].gameTab[b.x][b.y].name){
        usersList[id].gameTab[a.x][a.y].checked = checked.yes;
        usersList[id].gameTab[b.x][b.y].checked = checked.yes;
        return checked.yes;
    } else {
        return checked.no;
    }
}

function pictureToSend(login:string, l:Location):number{
    let user:User = findUserObject(login);
    return user.gameTab[l.x][l.y].name;
}

function updateGameTab(login:string):void{
    let id:string = findUserId(login);
    usersList[id].gameTab = initGameTab(usersList[id].gameMode);
}

function updateGameMode(login:string, gameMode:number):void{
    let id:string = findUserId(login);
    usersList[id].gameMode = gameMode;
}

function updateChecked(login:string):void{
    let id:string = findUserId(login);
    usersList[id].gameChecked++;
};

function checkIfWin(login:string):checked{
    let user:User = findUserObject(login);
    return user.gameMode==user.gameChecked?checked.yes:checked.no;
};

function resetGame(login:string):void{
    let id:string = findUserId(login);
    usersList[id].gameMode=null;
    usersList[id].gameChecked=null;
    usersList[id].gameTab=null;
};



//-------------communication function------------------
