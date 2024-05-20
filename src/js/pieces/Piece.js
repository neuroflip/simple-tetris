"use strict";

import Utils from "../Utils";
import { PEXEL_HEIGHT,
         PEXEL_WIDTH } from "../Utils";

class Piece {
    constructor(canvasContext) {
        this.canvasContext = canvasContext;
        this.position = { x: 0, y: 0 }; 
        this.piece = []
    }

    render() {
        for (let i=0; i<this.piece.length; i++) {
            for (let j=0; j<this.piece[i].length; j++) { 
                if (this.piece[i][j] === 1) {
                    const x = this.position.x;
                    const y = this.position.y;
    
                    Utils.drawPexel(this.canvasContext, x + j*PEXEL_WIDTH, y + i*PEXEL_HEIGHT, PEXEL_WIDTH);
                }
            }
        }
    }

    rotateRigth() {
        const rotation = []

        for(let i=0; i<this.piece[0].length; i++) {
            const newCol = []

            for(let j=this.piece.length - 1; j>=0; j--) { 
                newCol.push(this.piece[j][i])
            }

            rotation.push(newCol)
        }

        this.piece = rotation
    }

    moveDown() {
        this.position.y += PEXEL_HEIGHT;
    }

    moveLeft() {
        this.position.x -= PEXEL_WIDTH;
    }

    moveRigth() {
        this.position.x += PEXEL_WIDTH;
    }

    checkCollision() {

    }
}

export default Piece;