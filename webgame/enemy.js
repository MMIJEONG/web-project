 
 var donutPostion = new Array(400);
 function ShootingDownObj(gameAssets,canvasElement,a,b){
    this.canvasSize = {width: canvasElement.width, height: canvasElement.height};
    this.canvasContext = canvasElement.getContext('2d');
    this.canvasClientRect = canvasElement.getBoundingClientRect();     
    this.itemPostion = new Array(10);
    this.gameAssets = gameAssets;
    this.position = {x: a, y: b}  
    this.donutinedex = 2;
    this.donutbullets = new Array(200);
    this.creatcheck = new Array(200);

    for (var i = 0 ; i < donutPostion.length ; i++){
      var px = (Math.floor(Math.random() * 47) + 1)*50;
      var py = Math.floor(Math.random() *(-4000));
      donutPostion[i] = {x : px, y : py}; 
      var  b = i%this.donutinedex;
 
    }
         
      this.movePosition = function(){
      for(var i = 0 ; i<donutPostion.length ; i++){  
         if(donutPostion[i].x +  this.gameAssets.donut.width > this.position.x  
            && donutPostion[i].x < this.position.x + this.gameAssets.hero.width    
            && donutPostion[i].y > this.position.y  
            && donutPostion[i].y < this.position.y + this.gameAssets.hero.height)
          {
            game_over = true;
          }   
          donutPostion[i].y += 5;

          if(i%this.donutinedex==0 && donutPostion[i].y > 0 && this.creatcheck[(i/this.donutinedex)-i%this.donutinedex] == false){
            this.donutbullets[(i/this.donutinedex)-i%this.donutinedex].y = donutPostion[i].y+5;
            this.creatcheck[(i/this.donutinedex)-i%this.donutinedex] = true;
          }
      }
    }
    this.drawimage = function(){
       this.canvasContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
       for(var i = 0 ; i<donutPostion.length ; i++){
        var BI = (i/this.donutinedex)-i%this.donutinedex;
        if(donutPostion[i].y > 0 &&  this.creatcheck[BI] == true){
          this.canvasContext.drawImage(this.gameAssets.donutbullet, this.donutbullets[BI].x, this.donutbullets[BI].y);
        }
          this.canvasContext.drawImage(this.gameAssets.donut, donutPostion[i].x, donutPostion[i].y);   
      }
 
      this.canvasContext.drawImage(this.gameAssets.hero, this.position.x, this.position.y);  
     }
  }

var fps = 30;
var canvasElement;
var gameContext; 
var shootingDownObj; 
var donutbullet;   
var gameAssets;  
var currentAssetImageLoadCount = 0;    
var isKeyDown = [];
var speedhero = 10;
var score = 0;
var check = false;
var game_over = false;
function init(){
  canvasElement = document.getElementById('GameCanvas');
  gameContext = canvasElement.getContext('2d');

 
  var donutImage = new Image();  
  donutImage.src = 'donut2.png';        
  donutImage.onload = onAssetImageLoadComplete; 
 
 var heroImage = new Image();  
 heroImage.src = 'superhero.png';        
 heroImage.onload = onAssetImageLoadComplete;


 gameAssets = {donut: donutImage, hero:heroImage};     
}

function onAssetImageLoadComplete(){ 
  if(++currentAssetImageLoadCount >= 2 && check == false){   
    if(check == false){
      shootingDownObj = new ShootingDownObj(gameAssets,canvasElement,210,610);
      check = true;
    }      
    game_interval = setInterval(gameLoop, 1000 / fps); 
  }
}
function gameLoop(){
  if(game_over==true){
    clearInterval(game_interval);
    alert("게임오버");
    location.href="start.html"
  }
  update();
  display();
}

function update(){   
  
  shootingDownObj.movePosition();

  if(isKeyDown[37] && shootingDownObj.position.x > -10){ 
    shootingDownObj.position.x -= speedhero;
  }
  if(isKeyDown[38] && shootingDownObj.position.y > 5){ 
    shootingDownObj.position.y -= speedhero;
  }
  if(isKeyDown[39] && shootingDownObj.position.x < 462){ 
    shootingDownObj.position.x += speedhero;
  }
  if(isKeyDown[40] && shootingDownObj.position.y < 680){ 
    shootingDownObj.position.y += speedhero;
  }

}

function display(){
  shootingDownObj.drawimage();

}

 

function onKeyDown(e){  
  isKeyDown[e.keyCode] = true;   
}

 

function onKeyUp(e){
  isKeyDown[e.keyCode] = false;
}

 

window.addEventListener("load", init, false);
window.addEventListener("keydown",onKeyDown,false);
window.addEventListener("keyup",onKeyUp,false);