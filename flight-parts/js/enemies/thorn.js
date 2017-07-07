'use strict';

function Thorn(options) {

  // Thorn is a type of Enemy.
  Enemy.call(this, options);

  var defaultStates = {
    default: [
      new Hold(),
      new Fly({speed:20}),
    ],
  };

  this.states = options['states'] || defaultStates;

  this.timeline = options['timeline'] || {
    0: 'default',
  };

  this.prepare();

}

Thorn.prototype = Object.create(Enemy.prototype);
Thorn.prototype.constructor = Thorn;

// Overwrite update method.
Thorn.prototype.update = function(){

  Enemy.prototype.update.call(this);

};

