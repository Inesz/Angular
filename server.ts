var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    initPicturesList();
});

//---------------variables-----------------
interface gameMode{ mode:number; }
let gameModes : gameMode[] = [{mode: 2}, {mode: 4}, {mode: 6}, {mode: 8}];

enum checked {no, yes};
let picturesList: number[] = [];

interface User {
    login: string;
    gameMode: number;
    gameScore: Array<number>;    //game score
    gameTab: Array<number>;
    location1:number;          
}

let usersList: Array<User> = [];

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

function initGameScore(login:string):void{
    let id:string = findUserId(login);
    usersList[id].gameScore = [];
}

function initGameTab(gameMode:number):number[]{
    let tempGameTab: number[] = [];
    let tempPicturesList : number[] = picturesList.slice();
    let tempLocationList: number[] = [];
    let picture: number;
    let location: number;
    let i: number,j: number,p: number,l: number;
    
    //init tempLocationList
    for (i = 0; i < gameMode*2; i++) {
            tempLocationList.push(i);
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
            tempGameTab[location] = picture;
        }
    }
    
    return tempGameTab;
}

//check picture and update score
function checkPicture(login:string, l2:number):checked{
    let id:string = findUserId(login);
    let l1:number = usersList[id].location1;
    
    if(usersList[id].gameTab[l1] == usersList[id].gameTab[l2]){
        usersList[id].gameScore.push(usersList[id].gameTab[l1]);
        return checked.yes;
    } else {
        return checked.no;
    }
}

function pictureToSend(login:string, l:number):number{
    let user:User = findUserObject(login);
        return user.gameTab[l];
}

function updateGameTab(login:string):void{
    let id:string = findUserId(login);
    usersList[id].gameTab = initGameTab(usersList[id].gameMode);
}

function updateGameMode(login:string, gameMode:number):void{
    let id:string = findUserId(login);
    usersList[id].gameMode = gameMode;
}

function checkIfWin(login:string):checked{
    let user:User = findUserObject(login);
    return user.gameMode==user.gameScore.length?checked.yes:checked.no;
};


function comparePictures(login : string, picture : number) : {} {
    let id : string = findUserId(login);
    let img = "./images/"+pictureToSend(login, picture)+".png";
    let resp : {} = {};

    //pierwszy z pary
    if(usersList[id].location1 === undefined){
        usersList[id].location1 = picture;
        resp = {img};
    }else{
        //drugi z pary
        if(checkPicture(login, picture) === checked.yes){
            if(checkIfWin(login) === checked.yes)
                resp = {img, score : "win"};
            else    
                resp = {img, score : "hit"};
        }else{
            resp = {img, score : "fail"};
        }
        usersList[id].location1 = undefined;
    }
    return resp;
}

function resetGame(login:string):void{
    let id:string = findUserId(login);
    usersList[id].gameMode=null;
    usersList[id].gameScore=null;
    usersList[id].gameTab=null;
};

//-------------communication function------------------

app.get('/games', (req, res) => {
    console.log(gameModes);
     console.log(JSON.stringify(gameModes));
    res.send(JSON.stringify(gameModes));
});

app.post('/login', (req, res) => {
    console.log(req.body.login);
    console.log("login");
    if(loginIfFree(req.body.login)===checked.yes){
        res.sendStatus(JSON.stringify({'checked': 0}));
    }else{
        res.sendStatus(JSON.stringify({'checked': 1}));
    }
});

app.post('/game/:id', (req, res) => {
    
    if(req.body.mode !== undefined){
        updateGameMode(req.body.login, req.body.mode);
        updateGameTab(req.body.login);
        initGameScore(req.body.login);
        
        let pathToFile = "./images/"+0+".png";
        res.attachment(pathToFile);
        res.sendStatus(JSON.stringify({'img' : pathToFile}));
    
    }else{  
        res.sendStatus(JSON.stringify(comparePictures(req.body.login, req.body.id)));
    }
});