"use strict";

class KeyboardController {
  constructor(onMoveLeft,
              onMoveRight,
              onMoveUp,
              onMoveDown) {

    this.onMoveDown = onMoveDown;
    this.onMoveLeft = onMoveLeft;
    this.onMoveRight = onMoveRight;
    this.onMoveUp = onMoveUp;
    window.keyDown = window.keyDown || {};

    document.onkeydown = function(e) {
      e = e || window.event;
      window.keyDown[e.keyCode] = true;
    }

    document.onkeyup = function(e) {
      e = e || window.event;
      window.keyDown[e.keyCode] = false;
    }  
  }
}

export default KeyboardController;