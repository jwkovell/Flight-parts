function Scenery(options = {}) {

  this.x = options['x'] || 0;
  this.y = options['y'] || 0;
  this.z = options['z'] || 0;
  this.direction = options['direction'] || 0;
  this.width = options['width'] || 50;
  this.height = options['height'] || 50;
  this.regionStart = options['regionStart'] || 0;
  this.regionEnd = options['regionEnd'] || Infinity;
  this.parallaxScale = options['parallaxScale'] || 1;
  this.active = null;

}

Scenery.prototype = {

  prepare: function() {

    // Update parallax scale.
    this.parallaxScale = Math.pow(game.parallaxRate, this.z);

    // Apply parallax.
    this.x = this.x * this.parallaxScale;
    this.width = this.width * this.parallaxScale;
    this.height = this.height * this.parallaxScale;

  },

  update: function() {

    // If game has entered this object's region...
    if (game.offsetX > this.regionStart) {

      // If game has not scrolled past this object's region...
      if (game.offsetX < this.regionEnd) {

        // Object is active.
        this.active = true;

        // Update position.
        this.x = this.x - game.offsetSpeedX * this.parallaxScale;

      }

      // Else, game has scrolled past this object's region...
      else {

        // Object is not active.
        this.active = false;

      }

    }

  },

  draw: function() {

    // If object is active...
    if (this.active) {

      // Reset transformations and styles
      game.resetStage();

      // Position.
      game.stage.translate(this.x, this.y);
      game.stage.rotate(this.direction * Math.PI / 180);

      // Draw.
      game.stage.beginPath();
      game.stage.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      game.stage.stroke();
      game.stage.closePath();

    }

  }

}
