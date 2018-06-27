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
    }

    mario = new Mario(ctx);


    console.log("line 31");
    Mario.prototype.draw = function() {
      this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }

    Mario.prototype.update = function() {
      if (this.posY > 381) {

      }
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
        that.posX = that.posX - 5;
        }
        // console.log(posX);
        break;

        case 39:
        // console.log("right") ;
        if(that.posX <899) {
          // ctx.clearRect(0,0,900,500);
          that.posX = that.posX + 5;
          }
        // console.log(posX);
        break;

        case 38:
        that.gravity = -8;
        that.posY += 1 * that.gravity;
        console.log(that.gravity);
        console.log(that.posY);
      }
    }
  }

  Mario.prototype.update = function() {
    if (this.posY < 381) {
      console.log("this.posY: " + this.posY);
      this.posY += 1 * this.gravity;
    }
  }

    function updateCanvas() {
      
      if (gameStopped === false) {
        

      if (mario.gravity < 5) {
        // console.log("loop");
        // console.log("mario.gravity1: " + mario.gravity);
        mario.gravity += 0.35;
        // console.log("mario.gravity2: " + mario.gravity);
        // console.log("faby.gravity: " + faby.gravity);
      }
      ctx.clearRect(0,0,900,500);
      background();
      mario.update();
      mario.newPos();
      // console.log(mario);
      mario.draw();
      points += 1;
      ctx.fillText("Your score: " + points, 50, 50);

      
      
      // listObstacles.forEach(function(e) {
      //   e.draw();
      //   gameOver(listObstacles.indexOf(e));
      // })


      
      

      requestAnimationFrame(updateCanvas);
    }
  }

  updateCanvas();




  

}

};
