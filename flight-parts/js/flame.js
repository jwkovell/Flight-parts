'use strict';

function Flame(options = {}) {

  this.x = options['x'] || 0;
  this.y = options['y'] || 0;
  this.direction = options['direction'] || 0;

  this.width = options['width'] || 20;
  this.height = options['height'] || 20;

  this.rotation = options['rotation'] || 0;
  this.rotationIncrement = options['rotationIncrement'] || 15 * Math.PI / 180;

  this.scaleRate = options['scaleRate'] || .25;
  this.opacity = options['opacity'] || 1;
  this.speed = options['speed'] || 10;
  this.damage = options['damage'] || 1;
  this.collisionType = 'circle';

  // Maximum jitter to initial starting location.
  this.maxJitterX = options['maxJitterX'] || 5;
  this.maxJitterY = options['maxJitterY'] || 5;

  // Maximum duration of flame in frames.
  this.duration = options['duration'] || 30;

  // Frame count.
  this.frame = options['frame'] || 0;
  
  // Number of frames to fade out flame.
  this.fadeFrames = options['fadeFrames'] || 10;

  this.collisionBox = {};

  this.prepare();

}

Flame.prototype = {

  prepare: function() {

    // Calculate horizontal jitter.
    var jitterX = Math.floor(Math.random() * this.maxJitterX * 2);

    // Calculate vertical jitter.
    var jitterY = Math.floor(Math.random() * this.maxJitterY * 2 - this.maxJitterY);

    // Base flame position on dragon position.
    this.x = game.dragon.x + jitterX + game.dragon.width / 2 + 10;
    this.y = game.dragon.y + jitterY;

    // Base flame direction on dragon rotation.
    this.direction = game.dragon.rotation;

    // Randomize initial flame rotation.
    this.rotation = Math.floor(Math.random() * 2 * Math.PI);

    // Get control direction.
    var direction = game.controls.direction;

    // If dragon is moving forward or backward...
    if (direction) {

      // If dragon is moving forward...
      if (
        direction == -45 ||
        direction == 360 ||
        direction == 45
      ) {

        // Increase the flame speed.
        this.speed = this.speed + 2;

      }

      // Else, if dragon is moving backward...
      else if (
        direction == -135 ||
        direction == 180 ||
        direction == 135
      ) {

        // Decrease the flame speed.
        this.speed = this.speed - 2;

      }

    }

    // Generate collision box.
    this.collisionBox = new CollisionBox();

  },

  update: function() {

    // Update frame count.
    this.frame = this.frame + 1;

    // Update flame scale
    this.radius = this.radius + this.scaleRate;

    // Update rotation.
    this.rotation = this.rotation + this.rotationIncrement;

    // Update position.
    this.x = this.x + (this.speed * Math.cos( this.direction ));
    this.y = this.y + (this.speed * Math.sin( this.direction ));

    // Get the number of frames until the frame duration.
    var remainingFrames = this.duration - this.frame;

    // If flame duration has passed...
    if (remainingFrames <= 0) {

      // Fade out flame.
      this.opacity = this.opacity * (this.duration + remainingFrames) / this.duration;
    }

    // Update collision box.
    this.updateCollisionBox();

  },

  // Update collision box.
  updateCollisionBox: function() {

    this.collisionBox.set({
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height
    });

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

    // Draw flame.
    game.stage.globalAlpha = this.opacity;

    game.stage.beginPath();
    game.stage.moveTo(0, 0);
    game.stage.lineTo(-this.width / 2, 0);
    game.stage.stroke();
    game.stage.closePath();

    // Load images.
    //var image = document.getElementById('flame');
    //game.stage.drawImage(image, -this.width / 2, -this.height / 2, this.width, this.height);

  },

  isExpired: function() {

    if (this.frame > this.duration + this.fadeFrames) {
      return true;
    } else {
      return false;
    }
  
  },

}
