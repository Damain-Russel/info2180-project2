/**
* features completed: 
* Animations and/or transitions: Instead of each tile immediately appearing in its new position, they transition.
* Multiple backgrounds: Several background images (4) to choose from are available. Dedicated button to change image is also in the UI.
*
* I would like to be graded on the Animations and/or transitions feature.
*/
var sessionStart = false;
var shuffleBtn, pzlPiece, puzzleArea;
var ptop = 0, pleft = 0, counter = 1, min = 0, sec = 0, timer;
"use strict"
window.onload = function(){
    window.onclick = function(event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    var timeKeeper = document.createElement("P");
    var moves = document.createElement("P");
    var gameSession = document.createElement("P");
    
    puzzleArea = document.getElementById("puzzlearea");
    
    timeKeeper.id = "timeKeeper";
    timeKeeper.appendChild(document.createTextNode("Timer: 00:00"));
    document.getElementById("overall").insertBefore(timeKeeper,puzzleArea);
    timeKeeper.style.position = "fixed";
    timeKeeper.style.top = "13%";
    timeKeeper.style.left = "1%";
    
    moves.id = "moves";
    moves.appendChild(document.createTextNode("Moves: "));
    document.getElementById("overall").insertBefore(moves,puzzleArea);
    moves.style.position = "fixed";
    moves.style.top = "15%";
    moves.style.left = "1%";
    
    gameSession.id = "gameSession";
    document.getElementById("overall").insertBefore(gameSession,puzzleArea);
    gameSession.style.position = "fixed";
    gameSession.style.top = "20%";
    gameSession.style.left = "1%";
    
	pzlPiece = puzzleArea.getElementsByTagName("div");
	shuffleBtn = document.getElementById("shufflebutton");
	shuffleBtn.onclick = shuffle;
    allignGrid("background.jpg");
    moves.style.padding = "10px";
    btn();
}
function allignGrid(imgFile){
    var i;
    for (i = 0; i < pzlPiece.length; i++){
        pzlPiece[i].className = "puzzlepiece";
        pzlPiece[i].style.top = ptop + "px";
        pzlPiece[i].style.left = pleft + "px";
        pzlPiece[i].webkitTransition = "all 1000ms ease";
        pzlPiece[i].mozTransition = "all 1000ms ease";
        pzlPiece[i].msTransition = "all 1000ms ease";
        pzlPiece[i].oTransition = "all 1000ms ease";
        pzlPiece[i].style.transition = "all 1000ms ease";
        pzlPiece[i].style.backgroundImage =  "url('./img/"+imgFile+"')";
        pleft = pleft + 100;
        if(pleft > 300){
            ptop = ptop + 100;
            pleft = 0;
        }
        pzlPiece[i].style.backgroundPosition = "-" + pzlPiece[i].style.left + " " + "-" + pzlPiece[i].style.top;
        pzlPiece[i].onmouseover = function(){
            if(validMove(this.style.left, this.style.top)){
                this.classList.add("movablepiece");
                this.style.cursor = "pointer";
            }
        }
        pzlPiece[i].onmouseout = function(){
            this.classList.remove("movablepiece");
            this.style.cursor = "context-menu";
        }
        pzlPiece[i].onmousedown = function(){
            if(validMove(this.style.left, this.style.top)){
                movesCounter();
                var lst = swap(this.style.left, this.style.top);
                this.style.left = lst[0];
                this.style.top = lst[1];
            }
        }
    }
    ptop = 300;
    pleft = 300;
}
function validMove(leftPx,topPx){
    var valid = false;
    var x = parseInt(leftPx);
    var y = parseInt(topPx);
    if(x + 100 === pleft  && y === ptop){
        valid = true;   
    }
    else if(x - 100 === pleft && y === ptop){
        valid = true;
    }
    else if(y + 100 === ptop && x === pleft){
        valid = true;
    }
    else if (y - 100 === ptop && x === pleft){
        valid = true;
    }
    else {
        valid = false;
    }
    return valid;
}
function swap(leftPx, topPx){
    var temp = leftPx;
    leftPx = pleft + "px";
    pleft = parseInt(temp);
    temp = topPx;
    topPx = ptop +"px";
    ptop = parseInt(temp);
    return [leftPx, topPx];
}
function shuffle(){
    if(!sessionStart){
        timer = setInterval(timerKeeper,1000);
        var i, l;
        var lst2 = [];
        for(l = 0; l < 100; l++){
            for(i = 0; i < pzlPiece.length; i++){
                if(validMove(pzlPiece[i].style.left, pzlPiece[i].style.top)){
                    lst2.push([pzlPiece[i],i]);
                }
            }
            if(lst2.length != 0){
                var rndNum = Math.floor(Math.random() * lst2.length);
                var lst = swap(lst2[rndNum][0].style.left, lst2[rndNum][0].style.top);
                lst2[rndNum][0].style.left = lst[0];
                lst2[rndNum][0].style.top = lst[1];
            }
            else{
                l--;
            }
            lst2 = [];
        }
        sessionStart = true;
    }
    else{
        //pop up reset
    }
}

function btn() {
    var controls = document.getElementById("controls");
    var nxtBtn = document.createElement("BUTTON");
    var resetBtn = document.createElement("BUTTON");
    var gameInfo = document.createElement("BUTTON");
    nxtBtn.id = "next";
    resetBtn.id = "reset";
    gameInfo.id = "game-info";
    nxtBtn.appendChild(document.createTextNode("Next Img"));
    gameInfo.appendChild(document.createTextNode("Game Info"));
    resetBtn.appendChild(document.createTextNode("Reset Game"));
    var btnList = [nxtBtn, resetBtn, gameInfo, shuffleBtn];
    for(var i = 0; i < btnList.length; i++){
        btnList[i].style.fontFamily = "Arial";
        btnList[i].style.color = "#ffffff";
        btnList[i].style.fontSize = "16px";
        btnList[i].style.background = "#ff0073";
        btnList[i].style.padding = "10px 20px 10px 20px";
        btnList[i].style.textDecoration = "none";
        btnList[i].style.border = "none";
        btnList[i].style.margin = "3px";
        btnList[i].style.cursor = "pointer";
        if(i != 3){
            controls.appendChild(btnList[i]);
        }
    }
    nxtBtn.addEventListener("click", nextImg);
    gameInfo.addEventListener("click", modalClick);
    resetBtn.addEventListener("click", resetGame);
}

function resetGame(){
    var session = document.getElementById("gameSession");
    ptop = 0;
    pleft = 0;
    allignGrid("background.jpg");
    sessionStart = false;
    clearInterval(timer)
    document.getElementById("timeKeeper").innerHTML = "Timer: 00:00";
    document.getElementById("moves").innerHTML = "Moves:";
    min = 0;
    sec = 0;
}
function nextImg(){
    if(!sessionStart){
        ptop = 0;
        pleft = 0;
        var imgs =["background.jpg", "BG-2.jpg", "BG-3.jpg", "BG-4.jpg"];
        if(counter == 4){
            counter = 0;
        }
        else{
            allignGrid(imgs[counter]);
            counter++;
        }
    }
}

function modalClick(){
    var modal = document.createElement("DIV");
    var modalContent = document.createElement("DIV");
    var gameBar = document.createElement("DIV");
    var close = document.createElement("SPAN");
    gameBar.id = "gameBar";
    modal.id = "myModal";
    close.id = "close";
    modalContent.id = "modalContent";
    
    modal.style.display = "block";
    modal.style.position = "fixed"; 
    modal.style.zIndex = "1"; 
    modal.style.paddingTop = "100px";
    modal.style.left = "0px";
    modal.style.top = "0px";
    modal.style.width = "100%"; 
    modal.style.height = "100%";
    modal.style.overflow = "auto"; 
    modal.style.backgroundColor = "rgb(0,0,0)"; 
    modal.style.backgroundColor = "rgba(0,0,0,0.4)";

    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "auto";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "80%";
    
    close.style.color = "#aaaaaa";
    close.style.float = "right";
    close.style.fontSize = "28px";
    close.style.fonteWight = "bold";
    close.style.cursor = "pointer";
    close.style.position = "fixed";
    close.style.top = "100px";
    close.style.right = "130px";
    close.appendChild(document.createTextNode("x"));
    close.addEventListener("click",closeModal);
    
    var paragraph = document.createElement("P");
    var header = document.createElement("H1");
    header.appendChild(document.createTextNode("Game Instructions"));
    header.style.margin = "0px";
    
    var text = document.createTextNode("The 'Fifteen puzzle' (more generally called the Sliding Puzzle) is a simple classic game consisting of a 4x4 grid of numbered squares with one square missing. The goal of the fifteen puzzle is to un-jumble its fifteen squares by repeatedly making moves that slide squares into the empty space. You begin playing by hitting the 'Shuffle' button. When the Shuffle button is clicked, the tiles of the puzzle are randomized and a timer will begin. To move a piece, first you will have to hover over that piece and it will be highlighted if it can be moved. Once highlighted you may click on the piece and it will go to the empty spot. Once solved, you will be notified. Are you up for the challenge? How quickly can you solve it? Close this info dialoge and LETS FIND OUT!");
    paragraph.style.fontFamily = "Arial";
    paragraph.style.fontSize = "2em";
    paragraph.appendChild(text);
    
    modalContent.appendChild(header);
    modalContent.appendChild(close);
    modalContent.appendChild(paragraph);
    modal.appendChild(modalContent);
    
    document.getElementById("overall").insertBefore(modal, puzzleArea);
}

function closeModal(){
    document.getElementById("myModal").style.display = "none";
}

function movesCounter(){
    move++;
    document.getElementById("moves").innerHTML = "Moves: " + move;
}

function timerKeeper(){
    var time;
    if(sec < 59){
        sec++;
    }
    else{
        sec = 0;
        min++;
    }
    if(min < 10){
       time = "Timer: 0"+min+":"; 
    }
    else{
        time = "Timer: "+min+":"; 
    }
    if(sec < 10){
        time += "0"+sec;
    }
    else{
        time += sec;
    }
    document.getElementById("timeKeeper").innerHTML = time;
}
