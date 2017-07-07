'use strict';

function Ammo(options) {

  // Ammo is a type of Enemy.
  Enemy.call(this, options);

}

Ammo.prototype = Object.create(Enemy.prototype);
Ammo.prototype.constructor = Ammo;
