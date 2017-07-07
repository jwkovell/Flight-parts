'use strict';

function Hud(options = {}) {

  this.x = 20;
  this.y = 20;

  this.height = 20;

}

Hud.prototype = {

  update: function() {},

  draw: function() {

    // Reset transformations and styles
    game.resetStage();

    // Position canvas for drawing.
    game.stage.translate(this.x, this.y);

    // Get number of shots available based on stamina.
    var shotCount = Math.floor(game.dragon.stamina / game.dragon.fireballCost);

    // Get remaining stamina.
    var remainderStamina = game.dragon.stamina % game.dragon.fireballCost;

    // Loop through shots.
    for (var index = shotCount; index > 0; index--) {

      // Draw shot indicator.
      game.stage.beginPath();
      game.stage.arc(0, 0, this.height / 2, 0, 2 * Math.PI);
      game.stage.lineWidth = 4;
      game.stage.stroke();
      game.stage.closePath();

      // Position canvas for next shot indicator.
      game.stage.translate(this.height * 1.5, 0);

    }

    // If there is remainder stamina...
    if (remainderStamina) {

      // Draw stamina.
      game.stage.beginPath();
      game.stage.arc(0, 0, this.height / 3, 0, 2*Math.PI * (remainderStamina / game.dragon.fireballCost));
      game.stage.lineWidth = 4;
      game.stage.stroke();
      game.stage.closePath();

    }

    // Reset transformations.
    game.stage.setTransform(1, 0, 0, 1, 0, 0);

    // Position canvas for the health indicator frame.
    game.stage.translate(this.x - this.height / 2, this.y - 7 + this.height * 1.5);

    // Draw health indicator frame.
    game.stage.beginPath();
    game.stage.rect(0, 0, this.height * 7, this.height);
    game.stage.lineWidth = 2;
    game.stage.stroke();
    game.stage.closePath();

    // Position canvas for the health indicator.
    game.stage.translate(4, 4);

    var health = ((this.height * 7) - 8) * game.dragon.health / 100;

    // Draw.
    game.stage.beginPath();
    game.stage.rect(0, 0, health, this.height - 8);
    game.stage.fill();
    game.stage.closePath();

  }
}
