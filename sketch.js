var sword , swordImage , alien, alienImage , fruit, fruit1 , fruit2 , fruit3 , fruit4, gameover , gameoverImage, fruitGroup, alienGroup  ;
var score=0;
//game states
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameoverSound , swooshSound, game;

function preload(){
  swordImage=loadImage("sword.png");
  alienImage = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameover = loadImage("gameover.png");
  gameoverSound = loadSound("gameover.mp3");
  swooshSound = loadSound("swoosh.mp3");
}

function setup(){
  createCanvas(600,600);
  sword = createSprite(40,200,20,20);
  sword.addImage("sword",swordImage);
  fruitGroup= createGroup(); 
  alienGroup= createGroup(); 
game= createSprite(300,300,20,20);
  game.addImage(gameover);
  game.visible=false;
}

function draw(){
background("lightblue");
  if(gameState==PLAY){
  
  fruits();
  aliens();
  
  sword.x = World.mouseX;
  sword.y = World.mouseY;
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    swooshSound.play();
    score=score+2;
  }
  else {
  if(alienGroup.isTouching(sword)){
    gameState=END;
    game.visible=true;
    gameoverSound.play();
    fruitGroup.destroyEach();
    alienGroup.destroyEach();
    sword.destroy();
    
    
   
    
    
  }
  }
  }
  drawSprites();
  fill("black");
  text("score:"+score,530,30);
}

function fruits(){
  
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if (r==1){
      fruit.addImage(fruit1);
    }else if(r==2){
      fruit.addImage(fruit2);
    }else if(r==3){
      fruit.addImage(fruit3);
    }else{
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    var position=Math.round(random(1,2));
    if(position==1){
      fruit.x=400
      fruit.velocityX=-(7+score/4);
    }
    else if(position==2){
      fruit.x=0
    fruit.velocityX=(7+score/4);
    }
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}

function aliens(){
   if(World.frameCount%200===0){
      alien=createSprite(400,200,20,20);
      alien.addAnimation("alien",alienImage);
     alien.y=Math.round(random(100,300));
     alien.velocityX=-(8+score/10);
     alien.setLifetime=50;
     alienGroup.add(alien);
     
   }
}
