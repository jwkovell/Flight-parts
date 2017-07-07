'use strict';

function Fall(options = {}) {

  // Fall is a type of Behavior.
  Behavior.call(this, options);

  this.speed = options['speed'] || 2;

}

Fall.prototype = Object.create(Behavior.prototype);
Fall.prototype.constructor = Fall;

// Overwrite apply method.
Fall.prototype.apply = function(attributes){

    attributes.y = attributes.y + this.speed;

    return attributes;

};
