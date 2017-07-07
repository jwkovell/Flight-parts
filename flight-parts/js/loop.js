function Loop() {

  this.maxFPS = 24;
  this.lastFrame = 0;
  this.timePassed = 1;

}

Loop.prototype = {

  mainLoop: function(timestamp) {
    

    if (timestamp < game.loop.lastFrame + (1000 / game.loop.maxFPS)) {

      requestAnimationFrame(game.loop.mainLoop);

    } else {

      game.loop.timePassed = (timestamp - game.loop.lastFrame) / 100;

      // If a lot of time has passed...
      if (game.loop.timePassed > 1000) {

        // Reset the time passed counter.
        game.loop.timePassed = 0;

      }

      game.loop.lastFrame = timestamp;

      game.update();
      game.checkCollisions();
      game.cleanup();
      game.draw();

      requestAnimationFrame(game.loop.mainLoop);

    }

  }

}