"use strict";

import Piece from "./Piece";

class RightCross extends Piece {
    constructor(canvasContext) {
        super(canvasContext);

        this.piece = [];
        this.piece.push([0,1]);
        this.piece.push([1,1]);
        this.piece.push([1,0]);
    }
}

export default RightCross;