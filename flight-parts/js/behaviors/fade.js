'use strict';

function Fade(options = {}) {

  // Fall is a type of Behavior.
  Behavior.call(this, options);

  this.opacity = options['opacity'] || 1;
  this.speed = options['speed'] || .1;
  this.delay = options['delay'] || 0;
  this.frame = options['frame'] || 0;

}

Fade.prototype = Object.create(Behavior.prototype);
Fade.prototype.constructor = Fade;

// Overwrite apply method.
Fade.prototype.apply = function(attributes){

    this.frame++;

    if (this.frame > this.delay) {
      this.opacity = this.opacity - this.speed;
      if (this.opacity < 0) {
        this.opacity = 0;
      }
    }

    attributes.opacity = this.opacity;

    return attributes;

};
