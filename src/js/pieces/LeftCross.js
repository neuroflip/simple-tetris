"use strict";

import Piece from "./Piece";

class LeftCross extends Piece {
    constructor(canvasContext) {
        super(canvasContext);

        this.piece = [];
        this.piece.push([1,0]);
        this.piece.push([1,1]);
        this.piece.push([0,1]);
    }
}

export default LeftCross;