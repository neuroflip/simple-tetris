"use strict";

import Piece from "./Piece";

class Cross extends Piece {
    constructor(canvasContext) {
        super(canvasContext);

        this.piece = [];
        this.piece.push([0,1,0])
        this.piece.push([1,1,1])
    }
}

export default Cross;