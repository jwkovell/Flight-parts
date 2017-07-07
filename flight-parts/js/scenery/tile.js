'use strict';

function Tile(options) {

  // Tile is a type of scenery.
  Scenery.call(this, options);

  this.rowCount = 8;
  this.columnCount = 8;

  this.pixelMap = [
    [
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000'
    ],
    [
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000'
    ],
    [
      '#000000',
      '#333333',
      '#222222',
      '#000000',
      '#111111',
      '#000000',
      '#333333',
      '#222222'
    ],
    [
      '#333333',
      '#111111',
      '#222222',
      '#333333',
      '#222222',
      '#333333',
      '#111111',
      '#222222'
    ],
    [
      '#222222',
      '#333333',
      '#222222',
      '#111111',
      '#333333',
      '#222222',
      '#333333',
      '#111111'
    ],
    [
      '#333333',
      '#111111',
      '#222222',
      '#333333',
      '#222222',
      '#333333',
      '#111111',
      '#222222'
    ],
    [
      '#222222',
      '#333333',
      '#222222',
      '#111111',
      '#333333',
      '#222222',
      '#333333',
      '#111111'
    ],
    [
      '#111111',
      '#222222',
      '#111111',
      '#333333',
      '#111111',
      '#333333',
      '#111111',
      '#222222'
    ]
  ]

}

Tile.prototype = Object.create(Scenery.prototype);
Tile.prototype.constructor = Tile;

Tile.prototype.draw = function(){

  // If object is active...
  if (this.active) {

    // Reset transformations and styles
    game.resetStage();

    // Position.
    game.stage.translate(this.x, this.y);
    game.stage.rotate(this.direction * Math.PI / 180);

    var startX = -this.width / 2;
    var startY = -this.height / 2;
    var pixelWidth = this.width / this.rowCount;
    var pixelHeight = this.height / this.rowCount;

    // Loop through rows.
    for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {

      // Loop through columns.
      for (var columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {

        game.stage.beginPath();
        game.stage.fillStyle = this.pixelMap[rowIndex][columnIndex];
        game.stage.rect(startX + pixelWidth * columnIndex, startY + pixelHeight * rowIndex, pixelWidth, pixelHeight);
        game.stage.fill();
        game.stage.closePath();

      }

    }

  }

};
