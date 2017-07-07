'use strict';

function Hornet(options) {

  // Hornet is a type of Enemy.
  Enemy.call(this, options);

  var defaultStates = {
    default: [
      new Fly(),
    ],
    hold: [
      new Hold(),
      new Rotate({track: true}),
      new Fire(),
    ],
    advance: [
      new Fly({speed:20}),
    ],
    retreat: [
      new Fly(),
    ],
    dead: [
      new Fall()
    ],
  };

  this.states = options['states'] || defaultStates;

  this.timeline = options['timeline'] || {
    0: 'default',
    20: 'hold',
    400: 'advance',
  };

}

Hornet.prototype = Object.create(Enemy.prototype);
Hornet.prototype.constructor = Hornet;

// Overwrite update method.
/*Hornet.prototype.fire = function(){

  console.log('fire!');

};*/

