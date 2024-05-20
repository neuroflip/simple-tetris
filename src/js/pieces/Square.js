"use strict";

import Piece from "./Piece";

class Square extends Piece {
    constructor(canvasContext) {
        super(canvasContext);
        
        this.piece = [];
        this.piece.push([1,1]);
        this.piece.push([1,1]);
    }
}

export default Square;