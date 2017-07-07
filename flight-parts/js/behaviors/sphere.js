'use strict';

function Sphere(options = {}) {

  // Sphere is a type of Circle Behavior.
  Circle.call(this, options);

  this.radiusX = options['radiusX'] || 100;
  this.radiusY = options['radiusY'] || 100;

  this.scaledRadiusX = options['radiusX'] || 100;
  this.scaledRadiusY = options['radiusY'] || 100;

  this.directionX = options['directionX'] || 0;
  this.directionY = options['directionY'] || 0;

  this.rotation = options['rotation'] || 6;
  this.rotationX = options['rotationX'] || 0;
  this.rotationY = options['rotationY'] || 3;

}

Sphere.prototype = Object.create(Circle.prototype);
Sphere.prototype.constructor = Sphere;

// Overwrite apply method.
Sphere.prototype.apply = function(attributes){

    var directionRad = 0;
    var directionRadX = 0;
    var directionRadY = 0;

    // Move object to the center of the circle.
    directionRad = this.convertAngleToRadians(this.direction + 180);

    attributes.x = attributes.x + ((this.scaledRadiusX) * Math.cos( directionRad ));
    attributes.y = attributes.y + ((this.scaledRadiusY) * Math.sin( directionRad ));
    attributes.z = 0;

    // Update directions.
    this.direction = this.direction + this.rotation;
    this.directionX = this.directionX + this.rotationX;
    this.directionY = this.directionY + this.rotationY;

    // Move object to the edge of the circle at the new direction.
    directionRad = this.convertAngleToRadians(this.direction);
    directionRadX = this.convertAngleToRadians(this.directionX);
    directionRadY = this.convertAngleToRadians(this.directionY);


    // If x-axis rotation is given...
    if (this.rotationX) {

      // Update x radius
      this.scaledRadiusX = ((this.radiusX) * Math.cos( directionRadX ));

      // Distance from center on Y axis.
      var distY = Math.cos(this.convertAngleToRadians(this.direction));

      // Distance from center on Z axis.
      var distZ = distY * Math.sin(this.convertAngleToRadians(this.directionX));

      // Convert offset into a range suitable for opacity.
      attributes.z = distZ;

    }

    // If y-axis rotation is given...
    if (this.rotationY) {

      // Update y radius
      this.scaledRadiusY = ((this.radiusY) * Math.sin( directionRadY ));

      // Distance from center on X axis.
      var distX = Math.sin(this.convertAngleToRadians(this.direction));

      // Distance from center on Z axis.
      var distZ = distX * Math.cos(this.convertAngleToRadians(this.directionY));

      // Convert offset into a range suitable for opacity.
      attributes.z = distZ;

    }

    attributes.x = attributes.x + ((this.scaledRadiusX) * Math.cos( directionRad ));
    attributes.y = attributes.y + ((this.scaledRadiusY) * Math.sin( directionRad ));

    return attributes;

};
