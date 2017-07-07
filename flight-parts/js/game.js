'use strict';

function Game() {

  this.canvas = document.getElementById('canvas');

  this.stage = this.canvas.getContext('2d');

  this.x = 0;
  this.y = 0;

  this.width = 1000;
  this.height = 500;

  this.screenWidth = window.innerWidth;
  this.screenHeight = window.innerHeight;

  this.offsetX = 0;
  this.offsetY = 0;

  this.offsetSpeedX = 4;
  this.offsetSpeedY = 0;

  this.parallaxRate = 1.1;

  this.level = 0;

  this.dragon = {};
  this.hud = {};
  this.controls = {};

  this.background = [];
  this.enemies = [];
  this.flames = [];
  this.fireballs = [];
  this.foreground = [];

  this.loop = {};

}

Game.prototype = {

  // Reset stage defaults.
  resetStage: function() {

    this.stage.setTransform(1, 0, 0, 1, 0, 0);
    this.stage.globalAlpha = 1;
    this.stage.lineWidth = 1;
    this.stage.strokeStyle = "#000000";
    this.stage.fillStyle = "#000000";

  },

  // Load level content.
  loadLevel: function() {

    // Load background elements.
    this.background = levels[this.level]['background'];

    // Loop through background elements.
    this.background.forEach(function(element){

      // Prepare element.
      element.prepare();

    });

    // Load enemies.
    this.enemies = levels[this.level]['enemies'];

    // Loop through enemies.
    this.enemies.forEach(function(enemy){

      // Prepare enemy.
      enemy.prepare();

    });

    // Load items.
    this.items = levels[this.level]['items'];

    // Loop through items.
    this.items.forEach(function(item){

      // Prepare item.
      item.prepare();

    });

    // Load foreground elements.
    this.foreground = levels[this.level]['foreground'];

    // Loop through background elements.
    this.foreground.forEach(function(element){

      // Prepare element.
      element.prepare();

    });

  },

  // Prepare game.
  prepare: function() {

    // Instantiate Dragon.
    this.dragon = new Dragon();

    // Instantiate HUD.
    this.hud = new Hud();

    // Instantiate controls.
    this.controls = new Controls();

    // Load level content.
    this.loadLevel();

    // Instantiate Loop.
    this.loop = new Loop();

    // Start loop.
    requestAnimationFrame(this.loop.mainLoop);

  },

  // Update game.
  update: function() {

    // Increment screen offset.
    this.offsetX = this.offsetX + this.offsetSpeedX;
    this.offsetY = this.offsetY + this.offsetSpeedY;

    // Update controls.
    this.controls.update();

    // Update HUD.
    this.hud.update();

    // Loop through background elements.
    this.background.forEach(function(element){

      // Update element.
      element.update();

    });

    // Loop through foreground elements.
    this.foreground.forEach(function(element){

      // Update element.
      element.update();

    });

    // Loop through flames.
    this.flames.forEach(function(flame){

      // Update flame.
      flame.update();

    });

    // Loop through fireballs.
    this.fireballs.forEach(function(fireball){

      // Update fireball.
      fireball.update();

    });

    // Loop through the enemies.
    this.enemies.forEach(function(enemy){

      // Update enemy.
      enemy.update();

    });

    // Update dragon.
    this.dragon.update();

  },

  // Check collision between given objects.
  checkCollision: function(objectA, objectB) {

    var collisionBoxA = objectA.collisionBox;
    var collisionBoxB = objectB.collisionBox;

    // Assume no collision.
    var collision = false;

    // Check for square collision
    if (
      collisionBoxA.x < collisionBoxB.x + collisionBoxB.width &&
      collisionBoxA.x + collisionBoxA.width > collisionBoxB.x &&
      collisionBoxA.y < collisionBoxB.y + collisionBoxB.height &&
      collisionBoxA.height + collisionBoxA.y > collisionBoxB.y
    ) {

      // Collision detected.
      collision = true;

    }

    // Return result.
    return collision;

  },

  // Check collisions between all collidable objects.
  checkCollisions: function() {

    // Loop through enemies.
    for (var enemyIndex = 0; enemyIndex < this.enemies.length; enemyIndex++) {

      // Loop through flames.
      for (var flameIndex = 0; flameIndex < this.flames.length; flameIndex++) {

        // Check collision between this enemy and this flame.
        var flameCollision = this.checkCollision(this.flames[flameIndex],this.enemies[enemyIndex]);

        // If collision is detected...
        if (flameCollision) {

          // Fire enemy collision method.
          this.enemies[enemyIndex].collision(this.flames[flameIndex]);

          // Don't check for any more flame/enemy collisions.
          break;

        }

      }

      // Loop through fireballs.
      for (var FireballIndex = 0; FireballIndex < this.fireballs.length; FireballIndex++) {

        // Check collision between this enemy and this fireball.
        var fireballCollision = this.checkCollision(this.fireballs[FireballIndex],this.enemies[enemyIndex]);

        // If collision is detected...
        if (fireballCollision) {

          // Fire enemy collision method.
          this.enemies[enemyIndex].collision(this.fireballs[FireballIndex], {forceCollision: true});

          // Don't check for any more fireball/enemy collisions.
          break;

        }

      }

      // Check collision between this enemy and dragon.
      var enemyCollision = this.checkCollision(this.enemies[enemyIndex], this.dragon);

      // If collision is detected...
      if (enemyCollision) {

        // Fire dragon collision method.
        this.dragon.collision(this.enemies[enemyIndex]);

        // Don't check for any more enemy/dragon collisions.
        break;

      }

    }

  },

  // Remove inactive elements from the game.
  cleanup: function() {

    // Loop through flames in reverse order.
    for (var flameIndex = this.flames.length - 1; flameIndex >= 0; flameIndex--) {

      // If this flame has expired...
      if (this.flames[flameIndex].isExpired()) {

        // Remove the flame.
        this.flames.splice(flameIndex, 1);

      }

    }

    // Loop through fireballs in reverse order.
    for (var fireballIndex = this.fireballs.length - 1; fireballIndex >= 0; fireballIndex--) {

      // If this fireball has expired...
      if (this.fireballs[fireballIndex].isExpired()) {

        // Remove the fireball.
        this.fireballs.splice(fireballIndex, 1);

      }

    }

    // Loop through enemies in reverse order.
    for (var enemyIndex = this.enemies.length - 1; enemyIndex >= 0; enemyIndex--) {

      // If this enemy is no longer active...
      if (this.enemies[enemyIndex].active === false) {

        // Remove the enemy.
        this.enemies.splice(enemyIndex, 1);

      }

    }

  },

  draw: function() {

    // Reset transformations and styles
    this.resetStage();

    // Clear canvas.
    this.stage.clearRect(0, 0, this.canvas.width, this.height);

    // Loop through background elements.
    this.background.forEach(function(element){

      // Draw element.
      element.draw();

    });

    // Loop through enemies.
    this.enemies.forEach(function(enemy){

      // Draw enemy.
      enemy.draw();

    });

    // Draw dragon.
    this.dragon.draw();

    // Loop through flames.
    this.flames.forEach(function(flame){

      // Draw flame.
      flame.draw();

    });

    // Loop through fireballs.
    this.fireballs.forEach(function(fireball){

      // Draw fireball.
      fireball.draw();
 
    });

    // Loop through foreground elements.
    this.foreground.forEach(function(element){

      // Draw element.
      element.draw();

    });

    // Draw Controls.
    this.controls.draw();

    // Draw HUD.
    this.hud.draw();

  }

};
