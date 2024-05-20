"use strict";

import Utils from "../Utils";
import { PEXEL_WIDTH } from "../Utils";

class LineAnimation {
    constructor(canvasContext, x, y, onDestroy) {
        setTimeout(function(){ this.destroy() }.bind(this), 500);
        this.frame = 0;
        this.x = x;
        this.y = y;
        this.onDestroy = onDestroy;
        this.canvasContext = canvasContext;
    }

    render() {
        this.frame +=0.05;
        Utils.drawPexelsLine(this.canvasContext, this.x, this.y, PEXEL_WIDTH, this.frame);
    }

    destroy() {
        this.onDestroy();
    }
}

export default LineAnimation;