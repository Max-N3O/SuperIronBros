// listObstacles = [
//   {x: 0, y: 0, length: , width: },
// ]

listBackgroundPipes = [
  // {x: 50 - realPos, y: 383, length: 50, width: 50},
  // {x: 1000, y: 383, length: 50, width: 50},
]

listBackgroundClouds = [];


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



  var createGoombaVar;

  function startGame() {
    // updateCanvas();
    if (init) {
      console.log("Go clearInterval");
      cancelAnimationFrame(animationId);
      clearInterval(createGoombaVar);
      realPos = 450;
    }
    


    init = true;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = "images/background3.png";

    var gameStopped = false;
    var points = 0;
    var highScoreDisplay = 0;

    listGoomba = [];


    var posX = 450;
    var posY = 383 - 7;
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
      this.groundFloor = 383 - 7;
    }

    function Goomba (ctx, x) {
      // this.name = name;
      this.x = x;
      this.y = 403 - 7;
      this.height = 31;
      this.width = 31;
      this.ctx = ctx;
      this.img = new Image();
      this.img.src = "images/goomba.gif";
    }

    function BackgroundPipe (ctx, x, y, height, width) {
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.ctx = ctx;
      this.img = new Image();
      this.img.src = "images/pipe.png";
    }
    
    // function BackgroundPipe (ctx) {
    //   this.x = 50;
    //   this.y = 383 - 7;
    //   this.height = 50;
    //   this.width = 50;
    //   this.ctx = ctx;
    //   this.img = new Image();
    //   this.img.src = "images/pipe.png";
    // }

    BackgroundPipe.prototype.draw = function () {
      // this.x = 50;
      this.ctx.drawImage(this.img, this.x + 450 - realPos, this.y, this.width, this.height); 
    }

    backgroundPipe1 = new BackgroundPipe(ctx, 50, 383 - 7, 50, 50);
    backgroundPipe2 = new BackgroundPipe(ctx, 1000, 383 - 7, 50, 50);
    backgroundPipe3 = new BackgroundPipe(ctx, 1500, 383 - 7, 50, 100);
    //just changing height (length of pipe)
    backgroundPipe4 = new BackgroundPipe(ctx, 1800, 383 - 7 - 30, 80, 50);
    backgroundPipe5 = new BackgroundPipe(ctx, 2000, 383 - 7 - 50, 100, 50);
    backgroundPipe6 = new BackgroundPipe(ctx, 2200, 383 - 7 - 70, 120, 50);
    backgroundPipe7 = new BackgroundPipe(ctx, 3000, 383 - 7 - 30, 80, 50);
    backgroundPipe8 = new BackgroundPipe(ctx, 3600, 383 - 7 - 30, 80, 50);
    backgroundPipe9 = new BackgroundPipe(ctx, 4000, 383 - 7 - 30, 80, 50);
    backgroundPipe10 = new BackgroundPipe(ctx, 5000, 383 - 7 - 30, 80, 50);

    listBackgroundPipes.push(backgroundPipe1);
    listBackgroundPipes.push(backgroundPipe2);
    listBackgroundPipes.push(backgroundPipe3);
    listBackgroundPipes.push(backgroundPipe4);
    listBackgroundPipes.push(backgroundPipe5);
    listBackgroundPipes.push(backgroundPipe6);
    listBackgroundPipes.push(backgroundPipe7);
    listBackgroundPipes.push(backgroundPipe8);
    listBackgroundPipes.push(backgroundPipe9);
    listBackgroundPipes.push(backgroundPipe10);
    

    function BackgroundCloud (ctx, x, y, height, width) {
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.ctx = ctx;
      this.img = new Image();
      this.img.src = "images/cloud.png";
    }
  

    BackgroundCloud.prototype.draw = function () {
      this.ctx.drawImage(this.img, this.x + 450 - realPos, this.y, this.width, this.height); 
    }

    backgroundCloud1 = new BackgroundCloud(ctx, 100, 100, 50, 75);
    backgroundCloud2 = new BackgroundCloud(ctx, 400, 200, 50, 75);
    backgroundCloud3 = new BackgroundCloud(ctx, 700, 100, 50, 75);
    backgroundCloud4 = new BackgroundCloud(ctx, 1000, 200, 50, 75);
    backgroundCloud5 = new BackgroundCloud(ctx, 1300, 100, 50, 75);
    backgroundCloud6 = new BackgroundCloud(ctx, 1600, 200, 50, 75);
    backgroundCloud7 = new BackgroundCloud(ctx, 1900, 100, 50, 75);
    backgroundCloud8 = new BackgroundCloud(ctx, 2200, 200, 50, 75);
    backgroundCloud9 = new BackgroundCloud(ctx, 2500, 100, 50, 75);
    backgroundCloud10 = new BackgroundCloud(ctx, 2800, 200, 50, 75);
    backgroundCloud11 = new BackgroundCloud(ctx, 3100, 100, 50, 75);
    backgroundCloud12 = new BackgroundCloud(ctx, 3400, 200, 50, 75);
    backgroundCloud13 = new BackgroundCloud(ctx, 3700, 100, 50, 75);
    backgroundCloud14 = new BackgroundCloud(ctx, 4000, 200, 50, 75);
    backgroundCloud15 = new BackgroundCloud(ctx, 4300, 100, 50, 75);
    backgroundCloud16 = new BackgroundCloud(ctx, 4600, 200, 50, 75);
    backgroundCloud17 = new BackgroundCloud(ctx, 4900, 100, 50, 75);
    backgroundCloud18 = new BackgroundCloud(ctx, 5200, 200, 50, 75);
    backgroundCloud19 = new BackgroundCloud(ctx, 5500, 100, 50, 75);

    listBackgroundClouds.push(backgroundCloud1);
    listBackgroundClouds.push(backgroundCloud2);
    listBackgroundClouds.push(backgroundCloud3);
    listBackgroundClouds.push(backgroundCloud4);
    listBackgroundClouds.push(backgroundCloud5);
    listBackgroundClouds.push(backgroundCloud6);
    listBackgroundClouds.push(backgroundCloud7);
    listBackgroundClouds.push(backgroundCloud8);
    listBackgroundClouds.push(backgroundCloud9);
    listBackgroundClouds.push(backgroundCloud10);
    listBackgroundClouds.push(backgroundCloud11);
    listBackgroundClouds.push(backgroundCloud12);
    listBackgroundClouds.push(backgroundCloud13);
    listBackgroundClouds.push(backgroundCloud14);
    listBackgroundClouds.push(backgroundCloud15);
    listBackgroundClouds.push(backgroundCloud16);
    listBackgroundClouds.push(backgroundCloud17);
    listBackgroundClouds.push(backgroundCloud18);
    listBackgroundClouds.push(backgroundCloud19);



    function createGoomba() {
      // console.log("GoCreate");
      var rand = Math.random();

      // if (rand > 0.3) {
      var goomba = new Goomba(ctx, 450 + realPos);
      // var goomba = new Goomba(ctx, canvas.width);
      listGoomba.push(goomba);
      goombaNumber += 1;
      // console.log(goombaNumber);
      // }
    }

    createGoombaVar = setInterval(createGoomba, 4000);

    Goomba.prototype.draw = function() {
      this.x = this.x - 1;
      this.ctx.drawImage(this.img,this.x + 450 - realPos,this.y,this.width,this.height);
      // console.log("Goomba - this.Y: " + this.y);
    }

    mario = new Mario(ctx);


    
    Mario.prototype.draw = function() {
      this.ctx.drawImage(this.img, this.posX + 450 - realPos, this.posY, this.width, this.height);
      // console.log("this.posY: " + this.posY);
    }

   

    

    
    img.onload = function () {ctx.drawImage(img, 0, 0, 900, 500)};
    // mario.onload = function () {ctx.drawImage(mario, posX, posY, 50, 50)};
    function background() {ctx.drawImage(img, 0, 0, 900, 500)};
    // function background() {ctx.drawImage(img, 0, 0, 900, 500, 0, 0, 1350, 740)};
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
      // console.log("rightCollisionBackgroundPipe: " + rightCollisionBackgroundPipe);
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
        }
        
        // console.log("Left Collision after left move: " + leftCollisionBackgroundPipe);
        // console.log(posX);
        break;

        case 39:
        // console.log("right") ;
        // console.log("Right Collision before right move: " + rightCollisionBackgroundPipe);
        // console.log("checkRightCollisionBackgroundPipe(): " + checkRightCollisionBackgroundPipe());
        // console.log("rightCollisionBackgroundPipe(): " + rightCollisionBackgroundPipe);
        if(checkRightCollisionBackgroundPipe() === false) {
          // ctx.clearRect(0,0,900,500);
          mario.posX += 10;
          realPos += 10;
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
      this.groundFloor = 383 - 7;
    } else {
      
    this.groundFloor = (383 - 7) - listBackgroundPipes[verticalCollisionBackgroundPipe - 1].height;
    // this.groundFloor = listBackgroundPipes[verticalCollisionBackgroundPipe - 1].y - listBackgroundPipes[verticalCollisionBackgroundPipe - 1].height;
    // console.log("verticalCollisionBackgroundPipe: " + verticalCollisionBackgroundPipe);  
    // console.log("listBackgroundPipes[verticalCollisionBackgroundPipe - 1].y: " + listBackgroundPipes[verticalCollisionBackgroundPipe - 1].y);  
    // console.log("listBackgroundPipes[verticalCollisionBackgroundPipe - 1].height: " + listBackgroundPipes[verticalCollisionBackgroundPipe - 1].height);  
    // console.log("this.groundFloor: " + this.groundFloor);  
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
  rightCollisionBackgroundPipe = 0;
  verticalCollisionBackgroundPipe = 0;

}

  function checkDestruction() {
    listGoomba.forEach(function(e) {
      // console.log("typeof mario.posY: " + typeof mario.posY);
      // console.log("typeof mario.height: " + typeof mario.height);
      // console.log("mario.posY + mario.height: " + parseInt(mario.posY + mario.height));

      if ( (e.x <= mario.posX && mario.posX <= e.x + e.width) || ((e.x <= mario.posX + mario.width/2 && mario.posX + mario.width/2 <= e.x + e.width)) || ((e.x <= mario.posX + mario.width && mario.posX + mario.width <= e.x + e.width)) ) {
        console.log("possible");
        console.log("position Y Mario: " + parseInt(mario.posY + mario.height));
        console.log("position Y Goomba: " + parseInt(e.y));
        if (parseInt(mario.posY + mario.height) === parseInt(e.y)) {
          console.log("destruction");
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
    ctx.fillStyle = 'white';
    ctx.fillText("Game Over", 400, 200);
    ctx.fillText("Your score: " + parseInt(points + 1), 400, 250);
    clearInterval(createGoombaVar);
  }


  Mario.prototype.gameWon = function() {
    gameStopped = true;
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText("You won! You're a champ!", 400, 200);
    ctx.fillText("Your score: " + parseInt(points + 1), 400, 250);
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
      for (var i = 0; i < listBackgroundPipes.length; i++) {
        // console.log("i: " + i);
        listBackgroundPipes[i].draw();
      }

      for (var i = 0; i < listBackgroundClouds.length; i++) {
        listBackgroundClouds[i].draw();
      }

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
      ctx.fillStyle = 'white';
      ctx.fillText("Your score: " + points, 50, 50);
      ctx.fillText("realPos: " + realPos, 50, 100);
      
      if (highScoreDisplay === 1) {
      ctx.font = '20px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText("+1000", 400, 200);
      }

      if (mario.posX === 5500) {
        mario.gameWon();
      }

      
      
    


      
      

      animationId = requestAnimationFrame(updateCanvas);
    }
  }

  
  updateCanvas();




  

}

};
