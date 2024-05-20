import Utils  from "../Utils";
import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from "../Utils";
import KeyboardController from "./KeyboardController";
import TouchController from "./TouchController";

class IoController {
    constructor(moveCurrentPieceLeft,
                moveCurrentPieceRight,
                rotateCurrentPieceRight,
                moveCurrentPieceDown) {
        this.onMoveDown = moveCurrentPieceDown;
        this.onMoveLeft = moveCurrentPieceLeft;
        this.onMoveRight = moveCurrentPieceRight;
        this.onMoveUp = rotateCurrentPieceRight;
        window.keyDown = window.keyDown || {};
        
        if (Utils.isMobile()) {
            this.inputController = new TouchController();
            this.inputController.initialise();
            window.scrollTo(0,1)
        } else {
            this.inputController = new KeyboardController();
        }

    }

    checkKeys() {
        if (window.keyDown[KEY_DOWN]) {
            window.keyDown[KEY_DOWN] = false;
            this.onMoveDown();
        }
        if (window.keyDown[KEY_LEFT]) {
            window.keyDown[KEY_LEFT] = false;
            this.onMoveLeft();
        }
        if (window.keyDown[KEY_RIGHT]) {
            window.keyDown[KEY_RIGHT] = false;
            this.onMoveRight();
        }
        if (window.keyDown[KEY_UP]) {
            window.keyDown[KEY_UP] = false;
            this.onMoveUp();
        }
    }
}

export default IoController;