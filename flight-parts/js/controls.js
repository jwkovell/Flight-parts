'use strict';

function Controls(options = {}) {

  this.direction = null;

  this.keyUp;
  this.keyRight;
  this.keyDown;
  this.keyLeft;

  this.fire = false;
  this.dpad = false;
  this.mode = 'basic'; // or "full"

  this.dpadStartX = 0;
  this.dpadEndX = 500;
  this.directionKeys = [37, 38, 39, 40];

  this.fireDuration = 0;

  this.touchIgnoreRadius = 20;

  this.touchStartX = 0;
  this.touchStartY = 0;
  this.touchOffsetX = 0;
  this.touchOffsetY = 0;

  this.prepare();

}

Controls.prototype = {

  // Prepare controls.
  prepare: function() {

    // Set touch related handlers.
    this.setTouchHandlers();

    // Set key related handlers.
    this.setKeyHandlers();

  },

  // Set control touch handlers.
  setTouchHandlers: function() {

    //On touch start...
    document.body.addEventListener('touchstart', function(event){

      event.preventDefault();

      var self = game.controls;
      var touchCount = event['touches'].length;

      // Loop through touch points.
      for (var index = 0; index < event['touches'].length; index++) {

        // If touch falls within the dpad area...
        if (
          event['touches'][index]['clientX'] >= self.dpadStartX &&
          event['touches'][index]['clientX'] <= self.dpadEndX
        ) {

          if (self.dpad == false) {

            self.dpad = true;
            self.touchStartX = event['touches'][index]['clientX'];
            self.touchStartY = event['touches'][index]['clientY'];
            self.touchOffsetX = 0;
            self.touchOffsetY = 0;

          }

        }

        // Button touch start.
        else {

          self.fire = true;

        }

      }

    }, {passive: false});

    // If dpad touch end...
    document.body.addEventListener('touchend', function(event){

      event.preventDefault();

      var self = game.controls;
      var touchCount = event['changedTouches'].length;

      for (var index = 0; index < touchCount; index++) {

        // If touch falls within the dpad area...
        if (
          event['changedTouches'][index]['clientX'] > self.dpadStartX &&
          event['changedTouches'][index]['clientX'] < self.dpadEndX
        ) {

          self.dpad = false;
          self.direction = null;
          self.touchStartX = 0;
          self.touchStartY = 0;
          self.touchOffsetX = 0;
          self.touchOffsetY = 0;

        }

        // Button touch end.
        else {

          self.fire = false;

        }

      }

    }, {passive: false});

    //On touch move...
    document.addEventListener('touchmove', function(event){

      event.preventDefault();

      var self = game.controls;
      var touchCount = event['touches'].length;

      // Loop through touch points.
      for (var index = 0; index < touchCount; index++) {

        // If touch falls within the dpad area...
        if (
          event['touches'][index]['clientX'] > self.dpadStartX &&
          event['touches'][index]['clientX'] < self.dpadEndX
        ) {

          // Get offsets between the start and current location of the touch event.
          self.touchOffsetX = event['touches'][index]['clientX'] - self.touchStartX;
          self.touchOffsetY = event['touches'][index]['clientY'] - self.touchStartY;

          // Get direction direction.
          self.direction = Math.atan2(self.touchOffsetY, self.touchOffsetX);

          // If control mode is basic...
          if (self.mode == 'basic') {

            // If touch offset is significant...
            if (Math.abs(self.touchOffsetY) > self.touchIgnoreRadius) {

              if (self.direction < 0) {
                self.direction = -.5 * Math.PI;
              }
              else {
                self.direction = .5 * Math.PI;
              }

            }
            else {

              // Set direction to null.
              self.direction = null;

            }

          }

          // If control mode is full...
          else if (self.mode == 'full') {

            // If touch offset is significant...
            if (
              Math.abs(self.touchOffsetX) > self.touchIgnoreRadius ||
              Math.abs(self.touchOffsetY) > self.touchIgnoreRadius
            ) {

              if (self.direction < 0) {

                if (self.direction > -.125 * Math.PI) {
                  self.direction = 2 * Math.PI;
                }
                else if (self.direction > -.375 * Math.PI) {
                  self.direction = -.25 * Math.PI;
                }
                else if (self.direction > -.625 * Math.PI) {
                  self.direction = -.5 * Math.PI;
                }
                else if (self.direction > -.875 * Math.PI) {
                  self.direction = -.75 * Math.PI;
                }
                else {
                  self.direction = Math.PI;
                }

              } else {

                if (self.direction < .125 * Math.PI) {
                  self.direction = 2 * Math.PI;
                }
                else if (self.direction < .375 * Math.PI) {
                  self.direction = .25 * Math.PI;
                }
                else if (self.direction < .625 * Math.PI) {
                  self.direction = .5 * Math.PI;
                }
                else if (self.direction < .875 * Math.PI) {
                  self.direction = .75 * Math.PI;
                }
                else {
                  self.direction = Math.PI;
                }

              }

            } else {

              // Set direction to null.
              self.direction = null;

            }

          }

        }

      }

    }, {passive: false});

  },

  // Set control key handlers.
  setKeyHandlers: function() {

    //On key press...
    document.addEventListener('keydown', function(event){

      var self = game.controls;

      // If key code is 70 (f key)...
      if (event.keyCode == 70) {
        self.fire = true;
      }

      // If key code is 38 (up key)...
      else if (event.keyCode == 38) {
        self.keyUp = true;
      }

      // If key code is 39 (right key)...
      else if (event.keyCode == 39) {
        self.keyRight = true;
      }

      // If key code is 40 (down key)...
      else if (event.keyCode == 40) {
        self.keyDown = true;
      }

      // If key code is 37 (left key)...
      else if (event.keyCode == 37) {
        self.keyLeft = true;
      }

      // If this is a direction key...
      if (self.directionKeys.indexOf(event.keyCode) >= 0) {

        // Update control direction.
        self.setDirection();

      }

    });

    //On key release...
    document.addEventListener('keyup', function(event){

      var self = game.controls;

      // If key code is 70 (f key)...
      if (event.keyCode == 70) {
        self.fire = false;
      }

      // If key code is 32 (space key)...
      if (event.keyCode == 32) {
        self.keySpace = false;
      }

      // If key code is 39 (right key)...
      else if (event.keyCode == 39) {
        self.keyRight = false;
      }

      // If key code is 37 (left key)...
      else if (event.keyCode == 37) {
        self.keyLeft = false;
      }

      // If key code is 38 (up key)...
      else if (event.keyCode == 38) {
        self.keyUp = false;
      }

      // If key code is 40 (down key)...
      else if (event.keyCode == 40) {
        self.keyDown = false;
      }

      // If this is a direction key...
      if (self.directionKeys.indexOf(event.keyCode) >= 0) {

        // Update control direction.
        self.setDirection();

      }

    });

  },

  // Set control direction based on key states.
  setDirection: function() {

    if (this.keyUp && this.keyRight) {
      this.direction = -.25 * Math.PI;
    }
    else if (this.keyUp && this.keyLeft) {
      this.direction = -.5 * Math.PI;
    }
    else if (this.keyUp) {
      this.direction = -.5 * Math.PI;
    }
    else if (this.keyDown && this.keyRight) {
      this.direction = .25 * Math.PI;
    }
    else if (this.keyDown && this.keyLeft) {
      this.direction = .75 * Math.PI;
    }
    else if (this.keyDown) {
      this.direction = .5 * Math.PI;
    }
    else if (this.keyRight) {
      this.direction = 2 * Math.PI
    }
    else if (this.keyLeft) {
      this.direction = Math.PI
    }
    else {
      this.direction = null;
    }

  },

  update: function() {

    // If fire is active...
    if (this.fire) {

      // Increment fire duration.
      this.fireDuration++;

      // If fire has been active for 4 or more frames...
      if (this.fireDuration >= 4) {

        // If dragon has enough stamina to breath flames...
        if (game.dragon.stamina > game.dragon.flameCost) {

          // If this is the 3rd frame...
          if (this.fireDuration % 1 === 0) {

            // Update dragon's stamina.
            game.dragon.stamina = game.dragon.stamina - game.dragon.flameCost;

            // Add a new flame to the stage.
            game.flames.push(new Flame());

          }

        }

      }

    } else {

      // If fire was active for less than 4 frames...
      if (this.fireDuration < 4 && this.fireDuration > 0) {

        // If dragon has enough stamina to breath a fireball...
        if (game.dragon.stamina > game.dragon.fireballCost) {

          // Update dragon's stamina.
          game.dragon.stamina = game.dragon.stamina - game.dragon.fireballCost;

          // Add a new fireball to the stage.
          game.fireballs.push(new Fireball());

        }

      }

      // Reset fire duration to 0.
      this.fireDuration = 0;

    }

  },

  draw: function() {

    // If a touch event is in progress...
    if (this.dpad) {

      // Reset transformations and styles
      game.resetStage();

      // Get screen to canvas ratio.
      var screenCanvasRatio = game.width / game.screenWidth;

      var directions = [-.5 * Math.PI, -.25 * Math.PI, 2 * Math.PI, .25 * Math.PI, .5 * Math.PI, .75 * Math.PI, Math.PI, -.75 * Math.PI];
      var basicDirections = [-.5 * Math.PI, .5 * Math.PI];

      // Position canvas for controls.
      game.stage.translate(this.touchStartX * screenCanvasRatio, this.touchStartY * screenCanvasRatio);

      // Draw touch ignore radius.
      game.stage.beginPath();
      game.stage.arc(0, 0, this.touchIgnoreRadius, 0, 2 * Math.PI);
      game.stage.stroke();
      game.stage.closePath();

      for (var index = 0; index < directions.length; index++) {

        if (this.mode == 'full' || basicDirections.indexOf(directions[index]) >= 0) {

          game.stage.beginPath();
          game.stage.moveTo(0, -60);
          game.stage.lineTo(10, -40);
          game.stage.lineTo(-10, -40);
          game.stage.lineTo(0, -60);
          game.stage.stroke();
          if (this.direction == directions[index]) {
            game.stage.fill();
          }
          game.stage.closePath();

        }

        game.stage.rotate(45 * Math.PI / 180);

      }

    }

  }

}
