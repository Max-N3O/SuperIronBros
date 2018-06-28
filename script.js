window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {

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

    function createGoomba() {
      var rand = Math.random();

      if (rand > 0.3) {
      var goomba = new Goomba(ctx, canvas.width);
      listGoomba.push(goomba);
      }
    }

    var createGoomba = setInterval(createGoomba, 4000);

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
    function background() {ctx.drawImage(img, 0, 0, 900, 500)};
    // function drawMario() {ctx.drawImage(mario, posX, posY, 50, 50)};

    // console.log("line 51");

    Mario.prototype.newPos = function() {
      var that = this;

    document.onkeydown = function(e) {
      
      switch (e.keyCode) {
        case 37:
        // console.log("left") ;
        // console.log(img);
        if(that.posX> 1) {
        that.posX = that.posX - 10;
        }
        // console.log(posX);
        break;

        case 39:
        // console.log("right") ;
        if(that.posX <899) {
          // ctx.clearRect(0,0,900,500);
          that.posX = that.posX + 10;
          }
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
    if (this.posY < 381 && (this.posY + 1 * this.gravity) < 381) {
      this.posY += 1 * this.gravity;
      // console.log("this.gravity: " + this.gravity);
      // console.log("this.posY: " + this.posY);
    } else if (this.posY < 381) {
      this.posY = 381;
    }
  }


  function checkDestruction() {
    listGoomba.forEach(function(e) {
      // console.log("typeof mario.posY: " + typeof mario.posY);
      // console.log("typeof mario.height: " + typeof mario.height);
      // console.log("mario.posY + mario.height: " + parseInt(mario.posY + mario.height));

      if ( (e.x <= mario.posX && mario.posX <= e.x + e.width) || ((e.x <= mario.posX + mario.width/2 && mario.posX + mario.width/2 <= e.x + e.width)) || ((e.x <= mario.posX + mario.width && mario.posX + mario.width <= e.x + e.width)) ) {
        console.log("possible");
        console.log("position: " + parseInt(mario.posY + mario.height));
        if (parseInt(mario.posY + mario.height) === parseInt(e.y)) {
          console.log("destruction");
          e.destruction(e);
        }
      }  
    })
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
      background();
      mario.update();
      mario.newPos();
      // console.log(mario);
      mario.draw();
      listGoomba.forEach(function(e) {
        e.draw();
      })
      
      checkDestruction();
      checkKill();
      
      points += 1;
      ctx.fillText("Your score: " + points, 50, 50);
      
      if (highScoreDisplay === 1) {
      ctx.font = '20px Arial';
      ctx.fillText("+1000", 400, 200);
      }

      
      
    


      
      

      requestAnimationFrame(updateCanvas);
    }
  }

  updateCanvas();




  

}

};
