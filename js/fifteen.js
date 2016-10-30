"use strict"
var winner = false;
var sessionStart = false;
var shuffleBtn;
var pzlPiece;
var puzzleArea;
var ptop = 0;
var pleft = 0;
var validMoves = [];
window.onload = function(){
	puzzleArea = document.getElementById("puzzlearea");
	pzlPiece = puzzleArea.getElementsByTagName("div");
	shuffleBtn = document.getElementById("shufflebutton");
    var i;
	//shuffleBtn.onclick = shuffle();
    var imgs =["BG-1.jpg", "BG-2.jpg", "BG-3.jpg", "BG-4.jpg"];
    allignGrid(imgs[0]);
    
}

function allignGrid(imgFile){
    var i;
    for (i = 0; i < pzlPiece.length; i++){
        pzlPiece[i].className = "puzzlepiece";
        pzlPiece[i].style.top = ptop + "px";
        pzlPiece[i].style.left = pleft + "px";
        pleft = pleft + 100;
        if(pleft > 300){
            ptop = ptop + 100;
            pleft = 0;
        }
        pzlPiece[i].style.backgroundPosition = "-" + pzlPiece[i].style.left + " " + "-" + pzlPiece[i].style.top;

        
        pzlPiece[i].onmouseover = function(){
            if(validMove(this.style.left, this.style.top)){
                this.classList.add("movablepiece");
            }
        }
        pzlPiece[i].onmouseout = function(){
            this.classList.remove("movablepiece");
        }
        
        pzlPiece[i].onmousedown = function(){
            if(validMove(this.style.left, this.style.top)){
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

}
