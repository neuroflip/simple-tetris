"use strict";

import { SCREEN_HEIGTH,
         SCREEN_WIDTH,
         PEXEL_WIDTH } from "./Utils"
import Utils from "./Utils";
import AnimationController from "./animations/AnimationController";

class ScreenArrayController {
    constructor(canvasContext, onCompleteLine) {
        this.canvasContext = canvasContext;
        this.screenArray = new Array(SCREEN_HEIGTH);
        createScreenSecondaryArray.call(this, SCREEN_WIDTH);
        this.animationController = new AnimationController(this.canvasContext);
        this.onCompleteLine = onCompleteLine;
    }

    getValue(x, y) {
        return this.screenArray[x][y];
    }

    setValue(x, y, value) {
        return this.screenArray[x][y] = value;
    }

    render() {
        for(let i=0; i<this.screenArray.length; i++) {
            if(!this.checkCompleteLine(i)) {
                for(let j=0; j<this.screenArray[i].length; j++) {
                    if(this.screenArray[i][j] === 1) {
                        Utils.drawPexel(this.canvasContext, j*PEXEL_WIDTH, i*PEXEL_WIDTH, PEXEL_WIDTH);
                    }
                }
            }
        }

        this.animationController.render();
    }

    checkCompleteLine(line) {
        let found = false, 
            i=0;
    
        while(!found && i<this.screenArray[line].length) {
            if (this.screenArray[line][i] === 0) {
                found = true;
            } else {
                i++;
            }
        }
    
        return !found;
    }

    consolidatePiece(piece) {
        const pieceArray = piece.piece;
        const currentX = piece.position.x /PEXEL_WIDTH;
        const currentY = piece.position.y /PEXEL_WIDTH;
    
        for (let i=0; i<pieceArray.length; i++) {
            for (let j=0; j<pieceArray[i].length; j++) { 
                if (pieceArray[i][j] === 1) {
                    this.setValue(i+currentY, j+currentX, 1);
                }
            }
        }
    }

    removeCompleteLines() {
        for(let i=this.screenArray.length-1; i>=0; i--) {
            if(this.checkCompleteLine(i)) {
                this.animationController.createRemoveLineAnimation(0, i*PEXEL_WIDTH);
                this.onCompleteLine();
            }
        }
    
    
        function removeCompleteLine() {
            for(let i=this.screenArray.length-1; i>=0; i--) {
                if(this.checkCompleteLine(i)) {
                    this.removeLine(i);
                    clearInterval(this.timer);
                    this.timer = setInterval(this.bindedMoveDown, this.speed);
        
                    i++;
                }
            }
        }
        setTimeout(removeCompleteLine.bind(this),500);
    }
    
    removeLine(line) {
        let i = line;
        while(i>0) {
            this.screenArray[i] = this.screenArray[i-1];
            i--;
        }
    
        this.screenArray[0] = new Array(SCREEN_WIDTH).fill(0);
    }   
}

function createScreenSecondaryArray(subArraylength) {
    for (let i=0; i<this.screenArray.length; i++) {
        this.screenArray[i] = new Array(subArraylength).fill(0);
    }
}  

export default ScreenArrayController;