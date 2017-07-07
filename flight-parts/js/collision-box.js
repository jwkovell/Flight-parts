'use strict';

function CollisionBox(options = {}) {

  this.set(options);

}

CollisionBox.prototype = {

  set: function(options = {}) {

    this.x = options['x'] || 0;
    this.y = options['y'] || 0;
    this.width = options['width'] || 0;
    this.height = options['height'] || 0;

  }

}
