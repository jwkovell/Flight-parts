'use strict';

function Fire(options = {}) {

  // Fire is a type of Behavior.
  Behavior.call(this, options);

  this.frame = options['frame'] || 0;
  this.lastShot = options['lastShot'] || 0;
  this.shotFrequency = options['shotFrequency'] || 30;

}

Fire.prototype = Object.create(Behavior.prototype);
Fire.prototype.constructor = Fire;

// Overwrite apply method.
Fire.prototype.apply = function(attributes){

    this.frame++;

    attributes.fire = false;

    if ( this.frame - this.lastShot >= this.shotFrequency) {

      this.lastShot = this.frame;

      attributes.fire = true;

    }

    return attributes;

};
