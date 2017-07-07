'use strict';

function Fireball(options = {}) {

  Flame.call(this, options);

  this.width = options['width'] || 50;
  this.height = options['height'] || 50;

  this.duration = options['duration'] || 100;
  this.scaleRate = options['scaleRate'] || 0;
  this.speed = options['speed'] || 15;
  this.duration = options['duration'] || 200;
  this.damage = options['damage'] || 10;

}

Fireball.prototype = Object.create(Flame.prototype);
Fireball.prototype.constructor = Fireball;

// Overwrite draw method.
Fireball.prototype.draw = function(){

  // Reset transformations and styles
  game.resetStage();

  // Draw collision box.
  game.stage.globalAlpha = .25;
  game.stage.beginPath();
  game.stage.lineWidth = 4;
  game.stage.strokeStyle="#ff0000";
  game.stage.rect(this.collisionBox['x'], this.collisionBox['y'], this.collisionBox['width'], this.collisionBox['height']);
  game.stage.stroke();
  game.stage.closePath();
  game.stage.lineWidth = 1;
  game.stage.strokeStyle="#000000";
  game.stage.globalAlpha = 1;

  // Position.
  game.stage.translate(this.x, this.y);
  game.stage.rotate(this.rotation * Math.PI / 180);

  // Draw flame.
  game.stage.globalAlpha = this.opacity;

  game.stage.beginPath();
  game.stage.moveTo(0, 0);
  game.stage.lineTo(-this.width / 2, 0);
  game.stage.stroke();
  game.stage.closePath();

  // Load images.
  //var image = document.getElementById('flame');
  //game.stage.drawImage(image, -this.width / 2, -this.height / 2, this.width, this.height);

  game.stage.globalAlpha = 1;

}
