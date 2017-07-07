'use strict';

function Fly(options = {}) {

  // Fly is a type of Behavior.
  Behavior.call(this, options);

  this.speed = options['speed'] || 2;
  this.target = options['target'] || false;
  this.track = options['track'] || false;

}

Fly.prototype = Object.create(Behavior.prototype);
Fly.prototype.constructor = Fly;

// Overwrite prepare method.
Fly.prototype.prepare = function(attributes){

  // If behavoir is set to target...
  if (this.target) {

  }

}

// Overwrite apply method.
Fly.prototype.apply = function(attributes){

  attributes.y = attributes.y + this.speed * Math.sin(attributes.direction);
  attributes.x = attributes.x + this.speed * Math.cos(attributes.direction);

  return attributes;

};
