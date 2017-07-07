'use strict';

function Hold(options = {}) {

  // Hold is a type of Behavior.
  Behavior.call(this, options);

}

Hold.prototype = Object.create(Behavior.prototype);
Hold.prototype.constructor = Hold;

// Overwrite apply method.
Hold.prototype.apply = function(attributes){

    // Update position to move against the screen.
    attributes.x = attributes.x + game.offsetSpeedX;
    attributes.y = attributes.y + game.offsetSpeedY;

    return attributes;

};
