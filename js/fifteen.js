var sessionStart = false;
var shuffleBtn;
var pzlPiece;
var puzzleArea;
var ptop = 0;
var pleft = 0;
var reset;
var counter =1;
"use strict"
window.onload = function(){
	puzzleArea = document.getElementById("puzzlearea");
	pzlPiece = puzzleArea.getElementsByTagName("div");
    reset = pzlPiece;
	shuffleBtn = document.getElementById("shufflebutton");
    var i;
	shuffleBtn.onclick = shuffle;
    allignGrid("background.jpg");
    winner();
    btn();
}
function allignGrid(imgFile){
    var i;
    for (i = 0; i < pzlPiece.length; i++){
        pzlPiece[i].className = "puzzlepiece";
        pzlPiece[i].style.top = ptop + "px";
        pzlPiece[i].style.left = pleft + "px";
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
                var lst = swap(this.style.left, this.style.top);
                this.style.left = lst[0];
                this.style.top = lst[1];
                winner();
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
        //please reset
    }
    
}

function winner(){
    
    if(sessionStart && 
        pzlPiece[0].style.left === "0px" && pzlPiece[0].style.top === "0px" &&
        pzlPiece[1].style.left === "100px" && pzlPiece[1].style.top === "0px" &&
        pzlPiece[2].style.left === "200px" && pzlPiece[2].style.top === "0px" &&
        pzlPiece[3].style.left === "300px" && pzlPiece[3].style.top === "0px" &&
        pzlPiece[4].style.left === "0px" && pzlPiece[4].style.top === "100px" &&
        pzlPiece[5].style.left === "100px" && pzlPiece[5].style.top === "100px" &&
        pzlPiece[6].style.left === "200px" && pzlPiece[6].style.top === "100px" &&
        pzlPiece[7].style.left === "300px" && pzlPiece[7].style.top === "100px" &&
        pzlPiece[8].style.left === "0px" && pzlPiece[8].style.top === "200px" &&
        pzlPiece[9].style.left === "100px" && pzlPiece[9].style.top === "200px" &&
        pzlPiece[10].style.left === "200px" && pzlPiece[10].style.top === "200px" &&
        pzlPiece[11].style.left === "300px" && pzlPiece[11].style.top === "200px" &&
        pzlPiece[12].style.left === "0px" && pzlPiece[12].style.top === "300px" &&
        pzlPiece[13].style.left === "100px" && pzlPiece[13].style.top === "300px" &&
        pzlPiece[14].style.left === "200px" && pzlPiece[14].style.top === "300px" 
      ){
        console.log("you won");
        sessionStart = false;
    }
}

function btn() {
    var controls = document.getElementById("controls");
    var nxtBtn = document.createElement("BUTTON");
    var resetBtn = document.createElement("BUTTON");
    var gameInfo = document.createElement("BUTTON");
    nxtBtn.ID = "next";
    resetBtn.ID = "reset";
    gameInfo.ID = "game-info";
    nxtBtn.appendChild(document.createTextNode("Next Img"));
    gameInfo.appendChild(document.createTextNode("Game Info"));
    resetBtn.appendChild(document.createTextNode("Reset Game"));
    var btnList = [nxtBtn, resetBtn, gameInfo, shuffleBtn];
    //Styling buttons
    for(var i = 0; i < btnList.length; i++){
//        #3cb0fd
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
    gameInfo.addEventListener("click", modal);
    resetBtn.addEventListener("click", resetGame);

}


function resetGame(){
    ptop = 0;
    pleft = 0;
    allignGrid("background.jpg");
    sessionStart = false;
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

function modal(){
    var modal = document.createElement("DIV");
    var modalContent = document.createElement("DIV");
    var gameBar = document.createElement("DIV");
    gameBar.ID = "gameBar";
    modal.ID = "myModal";
    
    modal.style.display = "true";
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
    
    var paragraph = document.createElement("P");
    var text = document.createTextNode("<strong>Another </strong> paragraph, yay! This one will be styled different from the rest since we styled the DIV we specifically created.");
    paragraph.appendChild(text);
    paragraph.appendChild(text);
    modal.appendChild(modalContent);
    
    
    
    
    // Styling it
    gameBar.style.textAlign = "center";
    gameBar.style.color = "azure";
    gameBar.style.backgroundColor = "#f42f5c";
    gameBar.style.borderColor = "#bf0202";
    gameBar.style.padding = "5px";
    gameBar.style.width = "80%";
    gameBar.style.margin = "auto";
    gameBar.style.position = "absolute";
    gameBar.style.float = "left";
    
    
    //document.getElementById("overall").insertBefore(modal, puzzleArea);
}
