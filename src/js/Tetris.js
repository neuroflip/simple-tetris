"use strict";

import Utils  from "./Utils";
import ScreenArrayController from "./ScreenArrayController"
import { SCREEN_WIDTH,
    SCREEN_HEIGTH,
    SPEED,
    PEXEL_WIDTH } from "./Utils";
import IoController from "./ioController/IoController";

class Tetris {
    constructor (canvas) {
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext("2d");
        this.canvas.width = SCREEN_WIDTH * PEXEL_WIDTH;
        this.canvas.height = SCREEN_HEIGTH * PEXEL_WIDTH;
        this.screenArrayController = new ScreenArrayController(this.canvasContext, onLineCompleted.bind(this));
        this.bindedMain = this.main.bind(this);
        this.ioController = new IoController(moveCurrentPieceLeft.bind(this),
                                    moveCurrentPieceRight.bind(this),
                                    rotateCurrentPieceRight.bind(this),
                                    moveCurrentPieceDown.bind(this));

        window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame;

        this.points = 0;
        this.speed = SPEED;
        this.deltaTime = 0;
        this.lastTime = 0;
        this.newPiece = Utils.getRandomPiece(this.canvasContext);
        this.newPiece.position.x = (SCREEN_WIDTH*PEXEL_WIDTH) - PEXEL_WIDTH*2;
        this.currentPiece = Utils.getRandomPiece(this.canvasContext);
        this.main();
    }

    main(time = 0) {
        this.deltaTime += time - this.lastTime;
        this.lastTime = time;
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ioController.checkKeys();
        this.renderScreen();
    }

    renderScreen() {
        if (this.deltaTime >= this.speed) {
            moveCurrentPieceDown.call(this);
            this.deltaTime = 0;
        }
        this.screenArrayController.render();
        this.currentPiece.render();
        this.newPiece.render();
        renderPoints.call(this);

        window.requestAnimationFrame(this.bindedMain);
    }
}

function checkCollision(testPiece) {
    const pieceArray = testPiece.piece;
    const currentX = testPiece.position.x / PEXEL_WIDTH;
    const currentY = testPiece.position.y / PEXEL_WIDTH;
    let collision = (testPiece.position.x + pieceArray[0].length*PEXEL_WIDTH) > SCREEN_WIDTH*PEXEL_WIDTH || 
            testPiece.position.x < 0 || 
            (testPiece.position.y + pieceArray.length*PEXEL_WIDTH) > SCREEN_HEIGTH*PEXEL_WIDTH || 
            testPiece.position.y <0;

    if (!collision) {
        for (let i=0; i<pieceArray.length; i++) {
            for (let j=0; j<pieceArray[i].length; j++) { 
                if (pieceArray[i][j] === 1 && this.screenArrayController.getValue(i+currentY,j+currentX) === 1) {
                    collision = true;
                }
            }
        }
    }

    return collision;
}

function onLineCompleted() {
    this.points += 10;
    this.speed = Math.max(this.speed-100, 5);
}

function applyCollision() {
    this.screenArrayController.consolidatePiece(this.currentPiece);
    this.screenArrayController.removeCompleteLines();
    this.currentPiece = this.newPiece;
    this.currentPiece.position.x = 0;
    this.newPiece = Utils.getRandomPiece(this.canvasContext);
    this.newPiece.position.x = (SCREEN_WIDTH*PEXEL_WIDTH) - PEXEL_WIDTH*2;
}

function moveCurrentPieceLeft() {
    const testPiece = Utils.getPieceDataCopied(this.currentPiece);

    testPiece.position.x -= PEXEL_WIDTH;
    if(!checkCollision.call(this, testPiece)) {
        this.currentPiece.moveLeft();
    }
}

function moveCurrentPieceRight() {
    const testPiece = Utils.getPieceDataCopied(this.currentPiece);
    
    testPiece.position.x += PEXEL_WIDTH;
    if(!checkCollision.call(this, testPiece)) {
        this.currentPiece.moveRigth();
    }
}

function moveCurrentPieceDown() {
    const testPiece = Utils.getPieceDataCopied(this.currentPiece);

    testPiece.position.y += PEXEL_WIDTH;
    if(!checkCollision.call(this, testPiece)) {
        this.currentPiece.moveDown();
    } else {
        applyCollision.call(this);
    }
}

function rotateCurrentPieceRight() {
    const testPiece = Utils.getPieceDataCopied(this.currentPiece);

    testPiece.rotateRigth()
    if(!checkCollision.call(this, testPiece)) {
        this.currentPiece.rotateRigth();
    } else {
        this.currentPiece.rotateRigth();
        while (checkCollision.call(this, this.currentPiece)) {
            this.currentPiece.moveLeft();
        }
    }
}

function renderPoints() {
    this.canvasContext.font = "18px serif";
    this.canvasContext.fillText(this.points, PEXEL_WIDTH*SCREEN_WIDTH - 40, 16);
}

export default Tetris;