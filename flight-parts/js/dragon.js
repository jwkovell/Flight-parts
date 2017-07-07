'use strict';

function Dragon(options = {}) {

  this.x = options['x'] || 100;
  this.y = options['y'] || game.height / 2;

  this.width = options['width'] || 120;
  this.height = options['height'] || 60;

  this.rotation = 0;
  this.rotationIncrement = 5 * Math.PI / 180;
  this.minRotation = -15 * Math.PI / 180;
  this.maxRotation = 15 * Math.PI / 180;
  
  this.speed = 10;

  this.invincibilityFrames = 0;
  this.maxInvincibilityFrames = 30;

  this.health = 100;
  this.maxHealth = 100;

  this.stamina = 100;
  this.maxStamina = 100;

  this.flameCost = 2;
  this.fireballCost = 20;

  this.collisionBox = {};

  this.prepare();

}

Dragon.prototype = {

  prepare: function() {

    // Generate collision box.
    this.collisionBox = new CollisionBox();

  },

  update: function() {

    this.invincibilityFrames--;

    if (this.stamina < this.maxStamina) {
      if (game.controls.fire == false) {
        this.stamina++;
      }
    }

    // Get control direction.
    var direction = game.controls.direction;

    // If control direction is upward...
    if (
      direction == -.25 * Math.PI ||
      direction == -.5 * Math.PI ||
      direction == -.75 * Math.PI
    ) {

      // If the current rotation is greater than minimum rotation.
      if (this.rotation > this.minRotation) {

        // Reduce the current rotation by the rotation increment.
        this.rotation = this.rotation - this.rotationIncrement;

      } else {

        // Set current rotation to the minimum rotation.
        this.rotation = this.minRotation;

      }

    }

    // If control direction is downward...
    else if (
      direction == .25 * Math.PI ||
      direction == .5 * Math.PI ||
      direction == .75 * Math.PI
    ) {

      // If the current rotation is less than maximum rotation.
      if (this.rotation < this.maxRotation) {

        // Reduce the current rotation by the rotation increment.
        this.rotation = this.rotation + this.rotationIncrement;

      } else {

        // Set current rotation to the minimum rotation.
        this.rotation = this.maxRotation;

      }

    }

    // If control direction is flat...
    else {

      // If the current rotation is more than 0 by the rotation increment...
      if (this.rotation > this.rotationIncrement) {

        // Reduce the rotation by the rotation increment.
        this.rotation = this.rotation - this.rotationIncrement;

        // Nudge vertical position up.
        this.y = this.y + this.speed;

      }

      // Else, if the current rotation is less than 0 by the rotation increment...
      else if (this.rotation < -this.rotationIncrement) {

        // Increase the rotation by the rotation increment.
        this.rotation = this.rotation + this.rotationIncrement;

        // Nudge vertical position down.
        this.y = this.y - this.speed;

      }

      // Else, if the current rotation is not 0...
      else if (this.rotation !== 0) {

        // Set the current rotation to 0.
        this.rotation = 0;

      }

    }

    // If direction is defined.
    if (direction !== null) {

      if (game.controls.mode == 'full') {

        // Update X coordinates based on current control direction.
        this.x = this.x + (this.speed * Math.cos( direction ));

      }

      // Update Y coordinates based on current control direction.
      this.y = this.y + (this.speed * Math.sin( direction ));

    }

    // Prevent dragon from falling off the screen.
    if (this.x - this.width/2 < 0) {
      this.x = this.width/2;
    }
    else if (this.x + this.width/2 > game.width) {
      this.x = game.width - this.width/2;
    }
    if (this.y - this.height/2 < 0) {
      this.y = this.height/2;
    }
    else if (this.y + this.height/2 > game.height) {
      this.y = game.height - this.height/2;
    }

    // Update collision box.
    this.updateCollisionBox();

  },

  // Update collision box.
  updateCollisionBox: function() {

    var rotationSin = Math.abs(Math.sin(this.rotation));
    var rotationCos = Math.abs(Math.cos(this.rotation));

    var boxWidth = this.height * rotationSin + this.width * rotationCos;
    var boxHeight = this.height * rotationCos + this.width * rotationSin;

    this.collisionBox.set({
      x: this.x - boxWidth / 2,
      y: this.y - boxHeight / 2,
      width: boxWidth,
      height: boxHeight
    });

  },

  collision: function(object) {

    // If dragon is not currently invincible...
    if (this.invincibilityFrames <= 0) {

      // If object has a damage property...
      if ('damage' in object) {

        // Set invincibility frames.
        this.invincibilityFrames = this.maxInvincibilityFrames;
  
        // Reduce the health of dragon by the given damage.
        this.health = this.health - object.damage;
  
      }
  
      // If health is 0 or less...
      if (this.health < 0) {
  
        this.health = 0;
  
      }

    }

  },

  draw: function() {

    // Reset transformations and styles
    game.resetStage();

    // Draw collision box.
    game.stage.globalAlpha = .25;
    game.stage.beginPath();
    game.stage.lineWidth = 4;
    game.stage.strokeStyle="#ff0000";
    game.stage.rect(this.collisionBox['x'], this.collisionBox['y'], this.collisionBox['width'], this.collisionBox['height']);
    game.stage.stroke();
    game.stage.closePath();

    // Reset transformations and styles
    game.resetStage();

    // Position.
    game.stage.translate(this.x, this.y);
    game.stage.rotate(this.rotation);

    if (this.invincibilityFrames > 0) {
      game.stage.globalAlpha = .5;
    }

    // Draw dragon.
    game.stage.beginPath();
    game.stage.rect(-(this.width / 2), -(this.height / 2), this.width, this.height);
    game.stage.stroke();
    game.stage.closePath();

  },

}
