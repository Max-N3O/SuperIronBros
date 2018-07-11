// listObstacles = [
//   {x: 0, y: 0, length: , width: },
// ]

listBackgroundPipes = [
  // {x: 50 - realPos, y: 383, length: 50, width: 50},
  // {x: 500 - realPos, y: 383, length: 50, width: 50},
]


window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  var init;
  var animationId = null;
  var goombaNumber = 0;
  var leftCollisionBackgroundPipe = 0;
  var rightCollisionBackgroundPipe = 0;
  var verticalCollisionBackgroundPipe = 0;
  var backgroundX = 0;
  var realPos = 450;
  var turnLeft = false;
  var turnRight = false;


  var createGoombaVar;

  function startGame() {
    // updateCanvas();
    if (init) {
      console.log("Go clearInterval");
      cancelAnimationFrame(animationId);
      clearInterval(createGoombaVar);
    }


    init = true;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = "images/background.jpg";

    var gameStopped = false;
    var points = 0;
    var highScoreDisplay = 0;

    listGoomba = [];


    var posX = 450;
    var posY = 381;
    function Mario(ctx) {
      this.posX = posX;
      this.posY = posY;
      this.height = 50;
      this.width = 50;
      this.ctx = ctx;
      this.img = new Image();
      this.img.src = "images/mario.png";
      this.gravity = 1;
      //Introduction of variable groundFloor to determine where the player should be able to stand and jump from
      this.groundFloor = 381;
    }

    function Goomba (ctx, x) {
      // this.name = name;
      this.x = x;
      this.y = 401;
      this.height = 31;
      this.width = 31;
      this.ctx = ctx;
      this.img = new Image();
      this.img.src = "images/goomba.gif";
    }

    function BackgroundPipe (ctx) {
      this.x = 50;
      this.y = 383;
      this.height = 50;
      this.width = 50;
      this.ctx = ctx;
      this.img = new Image();
      this.img.src = "images/pipe.png";
    }

    BackgroundPipe.prototype.draw = function () {
      // this.x = 50;
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
    }

    backgroundPipe = new BackgroundPipe(ctx);
    listBackgroundPipes.push(backgroundPipe);


    function createGoomba() {
      // console.log("GoCreate");
      var rand = Math.random();

      // if (rand > 0.3) {
      var goomba = new Goomba(ctx, canvas.width);
      listGoomba.push(goomba);
      goombaNumber += 1;
      // console.log(goombaNumber);
      // }
    }

    createGoombaVar = setInterval(createGoomba, 4000);

    Goomba.prototype.draw = function() {
      this.x = this.x - 1;
      this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
      // console.log("Goomba - this.Y: " + this.y);
    }

    mario = new Mario(ctx);


    
    Mario.prototype.draw = function() {
      this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
      // console.log("this.posY: " + this.posY);
    }

   

    

    
    img.onload = function () {ctx.drawImage(img, 0, 0, 900, 500)};
    // mario.onload = function () {ctx.drawImage(mario, posX, posY, 50, 50)};
    function background() {ctx.drawImage(img, backgroundX, 0, backgroundX + 900, 500, 0, 0, 1350, 740)};
    // function background() {ctx.drawImage(img, sx, sy, swidth, sheight, 0, 0, 900, 500)};
    // function background() {ctx.drawImage(img, 0, 0, 900, 500)};
    // function drawMario() {ctx.drawImage(mario, posX, posY, 50, 50)};

    function checkLeftCollisionBackgroundPipe() {
      // if (listBackgroundPipes.length === 0) {
      //   console.log("ok1");
      //   return (horizontalCollisionBackgroundPipe > 0);
      // } else {
      listBackgroundPipes.forEach(function(e){
        if(e.x <= mario.posX && mario.posX <= e.x + e.width && mario.posY + mario.height > e.y) {
          leftCollisionBackgroundPipe = listBackgroundPipes.indexOf(e) + 1;
        }
      })
      return (leftCollisionBackgroundPipe > 0)
    // }
    
  }

    function checkRightCollisionBackgroundPipe() {
      // if (listBackgroundPipes.length === 0) {
      //   console.log("ok1");
      //   return (horizontalCollisionBackgroundPipe > 0);
      // } else {
      listBackgroundPipes.forEach(function(e){
        // console.log("forEach");
        // console.log("e.x: " + e.x);
        //   console.log("e.width: " + e.width);
        //   console.log("mario.posX: " + mario.posX);
        //   console.log("mario.width: " + mario.width);
        if((e.x <= mario.posX + mario.width && mario.posX + mario.width <= e.x + e.width && mario.posY + mario.height > e.y)) {
          rightCollisionBackgroundPipe = listBackgroundPipes.indexOf(e) + 1;
        }
      })
      return (rightCollisionBackgroundPipe > 0)
    // }
    
  }

    Mario.prototype.newPos = function() {
      var that = this;



    document.onkeydown = function(e) {
      
      switch (e.keyCode) {
        case 37:
        // console.log("left") ;
        // console.log(img);
        
        // console.log("Left Collision before left move: " + leftCollisionBackgroundPipe);
        if(checkLeftCollisionBackgroundPipe() === false) {
        mario.posX += -10;
        realPos += -10;
        turnLeft = true;
        }
        
        // console.log("Left Collision after left move: " + leftCollisionBackgroundPipe);
        // console.log(posX);
        break;

        case 39:
        // console.log("right") ;
        // console.log("Right Collision before right move: " + rightCollisionBackgroundPipe);
        // console.log(checkRightCollisionBackgroundPipe());
        if(checkRightCollisionBackgroundPipe() === false) {
          // ctx.clearRect(0,0,900,500);
          mario.posX += 10;
          realPos += 10;
          turnRight = true;
          }
        // rightCollisionBackgroundPipe = 0;
        // console.log("Right Collision after right move: " + rightCollisionBackgroundPipe);
        // console.log(posX);
        break;

        case 38:
        if (that.posY >= that.groundFloor) {
        that.gravity = -10;
        that.posY += 1 * that.gravity;
        }
      }
    }
  }

  Mario.prototype.update = function() {

    listBackgroundPipes.forEach(function(e){
      // console.log("mario.posX: " + mario.posX);
      // console.log("mario.posX + mario.width: " + parseInt(mario.posX + mario.width));
      if(e.x <= mario.posX && mario.posX < e.x + e.width) {
        verticalCollisionBackgroundPipe = listBackgroundPipes.indexOf(e) + 1;
        // this.groundFloor = this.groundFloor - listBackgroundPipes[leftCollisionBackgroundPipe - 1].height;
      } else if (e.x < parseInt(mario.posX + mario.width) && parseInt(mario.posX + mario.width) <= e.x + e.width) {
        verticalCollisionBackgroundPipe = listBackgroundPipes.indexOf(e) + 1;
        // this.groundFloor = this.groundFloor - listBackgroundPipes[rightCollisionBackgroundPipe - 1].height;
      }
    })

    if (verticalCollisionBackgroundPipe === 0) {
      this.groundFloor = 381;
    } else {
    this.groundFloor = listBackgroundPipes[verticalCollisionBackgroundPipe - 1].y - listBackgroundPipes[verticalCollisionBackgroundPipe - 1].height;
    }

    // console.log("this.groundFloor: " + this.groundFloor);

    // console.log("checkRightCollisionBackgroundPipe(): " + checkRightCollisionBackgroundPipe());
    // console.log("checkLeftCollisionBackgroundPipe(): " + checkLeftCollisionBackgroundPipe());
    // if (checkRightCollisionBackgroundPipe() === false && checkLeftCollisionBackgroundPipe() === false) {
    //   verticalCollisionBackgroundPipe = 0;
    // }
    // console.log(checkVerticalCollisionBackgroundPipe());
    // if (checkVerticalCollisionBackgroundPipe() === false || this.gravity < 0) {
    //   console.log("Go1");
    // console.log("this.groundFloor: " + this.groundFloor);
    if (this.posY < this.groundFloor && (this.posY + 1 * this.gravity) < this.groundFloor) {
      this.posY += 1 * this.gravity;
      // console.log("this.gravity: " + this.gravity);
      // console.log("this.posY: " + this.posY);
    } else if (this.posY < this.groundFloor) {
      this.posY = this.groundFloor;
    }
//   } else {
//     console.log("Go2");
//     // console.log("verticalCollisionBackgroundPipe: " + verticalCollisionBackgroundPipe);
//     // console.log("listBackgroundPipes[verticalCollisionBackgroundPipe - 1]: " + listBackgroundPipes[verticalCollisionBackgroundPipe - 1]);
//     // console.log("listBackgroundPipes[verticalCollisionBackgroundPipe - 1].height: " + listBackgroundPipes[verticalCollisionBackgroundPipe - 1].height);
//     if (this.posY < this.groundFloor - listBackgroundPipes[verticalCollisionBackgroundPipe - 1].height && (this.posY + 1 * this.gravity) < this.groundFloor - listBackgroundPipes[verticalCollisionBackgroundPipe - 1].height) {
//       this.posY += 1 * this.gravity;
//       // console.log("this.gravity: " + this.gravity);
//       // console.log("this.posY: " + this.posY);
//     } else if (this.posY < this.groundFloor - listBackgroundPipes[verticalCollisionBackgroundPipe - 1].height) {
//       this.groundFloor = this.groundFloor - listBackgroundPipes[verticalCollisionBackgroundPipe - 1].height;
//       this.posY = this.groundFloor;
//     }
//     console.log("this.posY: " + this.posY);

//   // })
// }
}

Mario.prototype.reset = function() {
  leftCollisionBackgroundPipe = 0;
  RightCollisionBackgroundPipe = 0;
  verticalCollisionBackgroundPipe = 0;

}

  function checkDestruction() {
    listGoomba.forEach(function(e) {
      // console.log("typeof mario.posY: " + typeof mario.posY);
      // console.log("typeof mario.height: " + typeof mario.height);
      // console.log("mario.posY + mario.height: " + parseInt(mario.posY + mario.height));

      if ( (e.x <= mario.posX && mario.posX <= e.x + e.width) || ((e.x <= mario.posX + mario.width/2 && mario.posX + mario.width/2 <= e.x + e.width)) || ((e.x <= mario.posX + mario.width && mario.posX + mario.width <= e.x + e.width)) ) {
        // console.log("possible");
        // console.log("position: " + parseInt(mario.posY + mario.height));
        if (parseInt(mario.posY + mario.height) === parseInt(e.y)) {
          // console.log("destruction");
          e.destruction(e);
        }
      }  
    })
  }



  function checkVerticalCollisionBackgroundPipe() {
    if (checkRightCollisionBackgroundPipe()) {
      if(mario.posY + mario.height > listBackgroundPipes[rightCollisionBackgroundPipe - 1].y) {
        verticalCollisionBackgroundPipe = rightCollisionBackgroundPipe;
      }} else if (checkLeftCollisionBackgroundPipe()) {
      if(mario.posY + mario.height > listBackgroundPipes[leftCollisionBackgroundPipe - 1].y) {
        verticalCollisionBackgroundPipe = leftCollisionBackgroundPipe;
      }}
//  console.log("verticalCollision: " + verticalCollisionBackgroundPipe);      
    return (verticalCollisionBackgroundPipe > 0);
}

  function checkKill() {
    listGoomba.forEach(function(e) {
      if ( (e.x <= mario.posX && mario.posX <= e.x + e.width) || ((e.x <= mario.posX + mario.width && mario.posX + mario.width <= e.x + e.width)) ) {
        if (parseInt(mario.posY + mario.height) > parseInt(e.y) && parseInt(mario.posY + mario.height) <= parseInt(e.y + e.height)) {
          console.log("Game Over");
          mario.gameOver();
        }
      }  
    })
  }

  Mario.prototype.gameOver = function() {
    gameStopped = true;
    ctx.font = '20px Arial';
    ctx.fillText("Game Over", 400, 200);
    ctx.fillText("Your score: " + points, 400, 250);
    clearInterval(createGoombaVar);
  }

  Goomba.prototype.destruction = function(element) {
    // positionX = element.x;
    listGoomba.splice(listGoomba.indexOf(element), 1);
    // ctx.drawImage(this.img,element.x,381, 25, 1);
    points += 1000;
    highScoreDisplay = 1;
    setTimeout(function() {
      highScoreDisplay = 0;
    }, 1000)
  }


  
    

    function updateCanvas() {
      
      if (gameStopped === false) {
        

      if (mario.gravity < 10) {
        // console.log("loop");
        // console.log("mario.gravity1: " + mario.gravity);
        mario.gravity += 0.25;
        // console.log("mario.gravity2: " + mario.gravity);
        // console.log("faby.gravity: " + faby.gravity);
        // console.log("feet: " + mario.posY + mario.height);
        // console.log("mario.posY: " + mario.posY);
        // console.log("mario.height: " + mario.height);
      }
      ctx.clearRect(0,0,900,500);
      // console.log("mario.posX: " + mario.posX);
      // console.log("backgroundX: " + backgroundX);
      // console.log("(backgroundX + 900) - mario.posX: " + parseInt((backgroundX + 900) - mario.posX));
      if ((backgroundX + 900) - mario.posX < 300) {
        backgroundX += 10;
      } else if (mario.posX - backgroundX < 300) {
        backgroundX += -10;
      }


      background();
      console.log(backgroundPipe.x);
      backgroundPipe.draw();
      // console.log("Go1");
      mario.update();
      mario.newPos();
      // console.log(mario);
      mario.draw();
      listGoomba.forEach(function(e) {
        e.draw();
      })
      mario.reset();
      
      checkDestruction();
      checkKill();
      
      points += 1;
      ctx.fillText("Your score: " + points, 50, 50);
      ctx.fillText("realPos: " + realPos, 60, 60);
      
      if (highScoreDisplay === 1) {
      ctx.font = '20px Arial';
      ctx.fillText("+1000", 400, 200);
      }

      
      
    


      
      

      animationId = requestAnimationFrame(updateCanvas);
    }
  }

  
  updateCanvas();




  

}

};
