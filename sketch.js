var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0;
var gameState = "START";
var survivaltime=0;
var ground;

function preload(){  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
   
}

//creating banana sprite
function food() {
  var banana = createSprite(400,Math.round(random(120, 200)), 10, 5);
  banana.addImage(bananaImage);
  banana.velocityX = -3;
  banana.lifetime = 150;
  banana.scale = 0.1;
  foodGroup.add(banana);
}

//creating obstacle sprite
function boulder() {
  var obstacle = createSprite(400, 325, 5, 5);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -5;
  obstacle.lifetime = 150;
  obstacle.scale = 0.09;
  obstacleGroup.add(obstacle);
}


function setup(){    
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -8;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
}


function draw() {
  background("orange");
  //createCanvas(600, 400);
     
  if (ground.x < 0.0){
      ground.x = ground.width/2;
  }
  
  if(keyDown("UP_ARROW") && monkey.y >= 300)  {
    monkey.velocityY = -12;
    //monkey.velocityY = monkey.velocityY + 0.8
    
  }
  
  if(monkey.y <= 200){
    monkey.velocityY = monkey.velocityY + 0.8    
  }
  
  var select_banana = Math.round(random(1,4));  
  if (World.frameCount % 80 == 0) {
    food();
  } 
  
   var select_obstacle = Math.round(random(1,4));  
  if (World.frameCount % 300 == 0) {
     boulder();
  } 

  if (foodGroup.isTouching(monkey)) {
    foodGroup.destroyEach();
    score = score + 2;
    monkey.scale += +0.01;
  }
  
  if (obstacleGroup.isTouching(monkey)) {
    gameState = "END";
  }
  else if(gameState === "END"){
    backgr.velocityX = 0;
    monkey.visible = false;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over!", 300, 220);
  }
  
  monkey.collide(ground);
  
  drawSprites();  
  
  // stroke("orange");
  // textSize(20);
  // fill("orange");
  
  //stroke("black");
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivaltime, 100, 50);
  text("Score: " + score, 100, 70);
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random (120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX=-4
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
 }
}