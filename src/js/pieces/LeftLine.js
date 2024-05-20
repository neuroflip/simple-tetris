"use strict";

import Piece from "./Piece";

class LeftLine extends Piece {
    constructor(canvasContext) {
        super(canvasContext);
        
        this.piece = [];
        this.piece.push([1,1]);
        this.piece.push([1,0]);
        this.piece.push([1,0]);
    }
}

export default LeftLine;