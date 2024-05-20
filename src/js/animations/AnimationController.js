"use strict";

import LineAnimation from "./LineAnimation";

class AnimationController {
    constructor(canvasContext) {
        this.animations = [];
        this.canvasContext = canvasContext;
    }

    createRemoveLineAnimation(x, y) {
        this.animations.unshift(new LineAnimation(this.canvasContext, x, y, this.destroyLineAnimation.bind(this)));
    }

    destroyLineAnimation() {
        this.animations.pop();
    }
    
    render() {
        this.animations.length && this.animations.forEach(element => {
            element.render();
        });
    
    }
}



export default AnimationController;