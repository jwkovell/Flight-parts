'use strict';

function Circle(options = {}) {

  // Circle is a type of Behavior.
  Behavior.call(this, options);

  this.radiusX = options['radiusX'] || 45;
  this.radiusY = options['radiusY'] || 45;

  this.direction = options['direction'] || 0;
  this.rotationSpeed = options['rotationSpeed'] || 10 * Math.PI / 180;

}

Circle.prototype = Object.create(Behavior.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.convertAngleToRadians = function(direction = 0){
  return (direction) * Math.PI / 180;
};

/*
Circle.prototype.position = function(attributes){

  // Move object to the edge of the circle at the new direction.
  var directionRad = this.convertAngleToRadians(this.direction);
  attributes.x = attributes.x + (this.radiusX * Math.cos( directionRad ));
  attributes.y = attributes.y + (this.radiusY * Math.sin( directionRad ));

  return attributes;

};
*/

// Overwrite apply method.
Circle.prototype.apply = function(attributes){

    // Move object to the center of the circle.
    attributes.x = attributes.x + (this.radiusX * Math.cos( this.direction + Math.PI ));
    attributes.y = attributes.y + (this.radiusY * Math.sin( this.direction + Math.PI ));

    // Increase direction.
    this.direction = this.direction + this.rotationSpeed;

    attributes.x = attributes.x + (this.radiusX * Math.cos( this.direction ));
    attributes.y = attributes.y + (this.radiusY * Math.sin( this.direction ));

    return attributes;

};
