'use strict';

function Rotate(options = {}) {

  // Rotate is a type of Behavior.
  Behavior.call(this, options);

  this.rotationIncrement = options['rotationIncrement'] || 5 * Math.PI / 180;
  this.track = options['track'] || false;
  this.updateDirection = options['updateDirection'] || false;

}

Rotate.prototype = Object.create(Behavior.prototype);
Rotate.prototype.constructor = Rotate;

// Overwrite apply method.
Rotate.prototype.apply = function(attributes){

  // If rotation is based on tracking...
  if (this.track) {

    var offsetX = attributes.x - game.dragon.x;
    var offsetY = attributes.y - game.dragon.y;

    attributes.rotation = Math.atan2(offsetY, offsetX);

    if (this.updateDirection) {
      attributes.direction = Math.atan2(offsetY, offsetX) + Math.PI;
    }


  } else {

    // Increase rotation by the given rotation speed.
    attributes.rotation = attributes.rotation + this.rotationIncrement; 

  }

  return attributes;

};
