'use strict';

function Bounce(options = {}) {

  // Bounce is a type of Circle Behavior.
  Circle.call(this, options);

  this.radiusX = options['radiusX'] || 0;
  this.radiusY = options['radiusY'] || 30;

}

Bounce.prototype = Object.create(Circle.prototype);
Bounce.prototype.constructor = Bounce;
