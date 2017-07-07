'use strict';

function Bee(options) {

  // Bee is a type of Enemy.
  Enemy.call(this, options);

  var defaultStates = {
    default: [
      new Circle()
    ],
    dead: [
      new Fall()
    ],
  };

  this.states = options['states'] || defaultStates;

  this.timeline = options['timeline'] || {
    0: 'default',
  };

}

Bee.prototype = Object.create(Enemy.prototype);
Bee.prototype.constructor = Bee;

// Overwrite update method.
Bee.prototype.update = function(){

  Enemy.prototype.update.call(this);

};

