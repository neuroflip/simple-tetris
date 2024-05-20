"use strict";

import Piece from "./Piece";

class Line extends Piece {
    constructor(canvasContext) {
        super(canvasContext);
        this.piece = [];
        this.piece.push([1,1,1,1]);    
    }
}

export default Line;