var gameState = 1;
var score =0



function preload (){
  asteroidImage = loadImage('asteroids.jpg')
  spaceImage = loadImage('background.jpg')
  rocketImage = loadImage('rocket ship.jpg')
  alienImage = loadImage('alien.png')
}


function setup(){
    createCanvas(600,400)

    backGround = createSprite(200,200,400,400)
    backGround.addImage(spaceImage)
    backGround.scale = 2.8;

    rocketShip = createSprite(50,200,20,20)
    rocketShip.addImage(rocketImage)
    rocketShip.scale = 0.5

    enemyGroup = createGroup()
    bulletGroup = createGroup()

    rocketShip.setCollider("rectangle",0,0,200,200)
    rocketShip.debug=true


}


function draw (){
  background("black")
  //camera.y = rocketShip.y
  if(gameState === 1 ){

    backGround.velocityX = -4;
    if(backGround.x<0){
        backGround.x = 200
    }

    if(keyDown(UP_ARROW)){
        rocketShip.y = rocketShip.y -5
    }

    if(keyDown(DOWN_ARROW)){
        rocketShip.y = rocketShip.y +5
    }

    Enemy();
    if(bulletGroup.isTouching(enemyGroup)){
      bulletGroup.destroyEach();
      enemyGroup.destroyEach();
      score = score+10
    }
  
   
  
    if(keyDown('SPACE')){
      createBullet();
    }

    if(enemyGroup.isTouching(rocketShip)){
      gameState = 2;

    }
  }

  if(gameState === 2){
    enemyGroup.setVelocityXEach(0)
    backGround.velocityX = 0;
  }

  drawSprites()
  textSize(20)
  text('Score :' +score,40,50)
}

function Enemy(){

  if(frameCount%100 === 0){
     enemy = createSprite(600,Math.round(random(20,380)))
     var number = Math.round(random(1,2))
     enemy.velocityX = -5
     enemy.scale = 0.1
     if(number === 1){
         enemy.addImage(alienImage)

         
     }
     else{

        enemy.addImage(asteroidImage)
        
     }
     enemy.setCollider("rectangle",0,0,200,200)
     enemy.debug = true
     enemyGroup.add(enemy)
     
  }

}



function createBullet(){

  var bullet = createSprite (rocketShip.x+50,rocketShip.y,20,8)
  bullet.shapeColor = 'red';
  bullet.velocityX = 5;
  bulletGroup.add(bullet)


}