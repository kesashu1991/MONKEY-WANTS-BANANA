
var monkey , monkey_running, ground, groundImage, invisibleGround, monkeycollided
var banana ,bananaImage, obstacle, obstacleImage, gameover, restart
var FoodGroup, obstacleGroup
var score=0
var Play=1
var end=0
var gameState=Play;
var bananascore=0
var gameOverimage,restartimage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  groundImage= loadAnimation("ground.png");
  monkeycollided= loadAnimation("sprite_0.png")
  gameOverimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");
 
}



function setup() {
  createCanvas(400,400)
 monkey=createSprite(100,275,20,20);
  monkey.addAnimation("running",monkey_running)
  monkey.addAnimation("collide",monkeycollided)
  monkey.scale=0.10
  
  gameover=createSprite(200,200,20,20);
  gameover.addImage(gameOverimage);
  gameover.scale=0.7
  
  
  restart=createSprite(200,240,20,20);
  restart.addImage(restartimage);
  restart.scale=0.5
  restart.visible=false
  
   ground=createSprite(width/2,height,width,2)
  ground.addAnimation("ground",groundImage);
  ground.velocityX=-3
 
  
  invisibleGround=createSprite(width/2,height-20,width,125)
  invisibleGround.visible=false   
  
  obstacleGroup=createGroup();
  FoodGroup=createGroup();
  
  monkey.setCollider("rectangle",0,0,20,monkey.height);
  monkey.debug=false
}


function draw() {
  background("chartreuse")
  textSize=20
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SURVIVAL TIME= "+ score,210,15)
  text("score="+ bananascore,100,15)

 
  monkey.velocityY=monkey.velocityY+0.8
  monkey.collide(invisibleGround)

  
  
  if (gameState===Play){
    gameover.visible=false
    restart.visible=false
    ground.velocityX=-3
     
    if (ground.x < 0){
      ground.x = ground.width/2;
      
    }
      food_();
  obstacle_();
        score = score + Math.round(getFrameRate()/60);
    
     if (keyDown("space")&& monkey.y>=150){
    monkey.velocityY=-10
       
       if (monkey.isTouching(FoodGroup)){
         bananascore++
         FoodGroup.destroyEach();
       }
  }
  }
  if (obstacleGroup.isTouching(monkey)){
    gameState=end
  }
  else if (gameState===end){
    ground.velocityX=0
    monkey.velocityY=0
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.changeAnimation("collide",monkeycollided)
    survivalTime=0
    gameover.visible=true
    restart.visible=true

    
  }
  
  if (mousePressedOver(restart))
    {
      gameState=Play
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      score=0
      bananascore=0
      monkey.changeAnimation("running",monkey_running)
      ground.changeAnimation("ground",groundImage)  }
    drawSprites();
  
}
 function food_(){
   if(frameCount%80===0){
     var food=createSprite(width+20,height-300,20,20)
     food.addImage(bananaImage)
     food.scale=0.10
     food.velocityX=-(3+score*0.1/100) 
     food.y=Math.round(random(80,200));
     food.lifetime=100;
     food.depth=monkey.depth
     monkey.depth=monkey.depth+1
     FoodGroup.add(food)
   }
 }
function obstacle_(){
  if(frameCount%300===0){
    var obstacle=createSprite(300,height-95,10,10)
    obstacle.addImage(obstaceImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale=0.15
    obstacle.velocityX=-5
    obstacle.lifetime=300
    obstacleGroup.add(obstacle);
    obstacle.depth=monkey.depth
    monkey.depth+=1
    
  }
}






