'use strict';

function Grid(options) {

  // Grid is a type of scenery.
  Scenery.call(this, options);

  this.divisions = options['divisions'] || 10;
  this.color = options['color'] || 'rgba(0, 0, 0, .25)';

}

Grid.prototype = Object.create(Scenery.prototype);
Grid.prototype.constructor = Grid;

Grid.prototype.draw = function(){

  // If object is active...
  if (this.active) {

    // Reset transformations and styles
    game.resetStage();

    // Position.
    game.stage.translate(this.x, this.y);
    game.stage.rotate(this.direction * Math.PI / 180);

    // Draw horizontal lines.
    for (var rowIndex = 0; rowIndex <= this.divisions; rowIndex++) {

      game.stage.beginPath();
      game.stage.strokeStyle = this.color;
      game.stage.moveTo(-this.width / 2, -this.height / 2 + this.height * (rowIndex / this.divisions));
      game.stage.lineTo(this.width / 2, -this.height / 2 + this.height * (rowIndex / this.divisions));
      game.stage.stroke();
      game.stage.closePath();

    }

    // Draw vertical lines.
    for (var columnIndex = 0; columnIndex <= this.divisions; columnIndex++) {

      game.stage.beginPath();
      game.stage.strokeStyle = this.color;
      game.stage.moveTo(-this.width / 2 + this.width * (columnIndex / this.divisions), -this.height / 2);
      game.stage.lineTo(-this.width / 2 + this.width * (columnIndex / this.divisions), this.height / 2);
      game.stage.stroke();
      game.stage.closePath();

    }

  }

};
