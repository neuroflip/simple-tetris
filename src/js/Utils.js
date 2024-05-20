"use strict";

import Line from "./pieces/Line";
import Cross from "./pieces/Cross";
import Square from "./pieces/Square";
import LeftCross from "./pieces/LeftCross";
import LeftLine from "./pieces/LeftLine";
import RightCross from "./pieces/RightCross";
import RightLine from "./pieces/RightLine";

const Utils = {
    drawPexel(canvasContext, x, y, pixelWidth, frame = 0) {
        canvasContext.save();
        canvasContext.translate(x+pixelWidth/2, y+pixelWidth/2);

        if (frame) {
            canvasContext.scale(frame, frame);
            canvasContext.rotate(frame * 0.35);
        }
        canvasContext.shadowColor="white";
        canvasContext.shadowBlur = frame * 10;

        canvasContext.beginPath();
        canvasContext.moveTo(-pixelWidth/2, pixelWidth/2);
        canvasContext.lineTo(pixelWidth/2, pixelWidth/2);
        canvasContext.lineTo(pixelWidth/2, -pixelWidth/2);
        canvasContext.lineTo(-pixelWidth/2, -pixelWidth/2);
        canvasContext.lineTo(-pixelWidth/2, pixelWidth/2);
        
        canvasContext.lineTo(pixelWidth/2, -pixelWidth/2);
        canvasContext.fill();
        canvasContext.restore();
    },

    drawPexelsLine(canvasContext, x, y, pixelWidth, frame) {
        for(let i=0; i<SCREEN_WIDTH; i++) {
            this.drawPexel(canvasContext, x + (i*PEXEL_WIDTH), y, PEXEL_WIDTH, frame);
        }
    },

    getPieceDataCopied(piece) {
        const newPiece = new piece.__proto__.constructor

        newPiece.position = {...piece.position};
        newPiece.piece = [...piece.piece];

        return newPiece;
    },
    
    getRandomPiece(canvasContext) {
        let objects = [ Line, Square, Cross, LeftCross, LeftLine, RightCross, RightLine ];
    
        return new objects[Math.floor(Math.random() * 7)](canvasContext);
    },

    createTouchDivAndAddToParent(classname, parent) {
        let div = document.createElement('div')
		div.classList.add(classname,'touch-cell')

		parent.appendChild(div);
    },

    isMobile() {
        const ua = navigator.userAgent;

        return (ua.match(/Android/i) || ua.match(/BlackBerry/i) || ua.match(/iPhone|iPad|iPod/i) || ua.match(/Opera Mini/i) || ua.match(/IEMobile/i));
    }
}

export const SCREEN_WIDTH = 10;
export const SCREEN_HEIGTH = 16;
export const SPEED = 2000;
export const PEXEL_WIDTH = 32;
export const PEXEL_HEIGHT = 32;

export const KEY_LEFT = 37;
export const KEY_UP = 38;
export const KEY_RIGHT = 39;
export const KEY_DOWN = 40;
export const KEY_SPACE = 55;

export default Utils;

