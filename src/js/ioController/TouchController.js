import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_SPACE } from "../Utils";
import Utils from "../Utils";

let _TOUCHRESOLUTION = 150;
const SCREEN_RES_X = window.innerWidth / 3;
const SCREEN_RES_Y = window.innerHeight / 3;

class TouchController {
	constructor() {
		this.startTimeStamp = new Date();
		this.lastTouchMoveX = 0;
		this.lastTouchMoveY = 0;
		this.baseTouchMoveX = 0;
		this.baseTouchMoveY = 0;
        this.currentBaseTouch=null;  
        window.keyDown = window.keyDown || {};

		const container = document.createElement('div')
		container.classList.add('touch-cell-container')

		Utils.createTouchDivAndAddToParent('touch-leftTop', container);
		Utils.createTouchDivAndAddToParent('touch-top', container);
		Utils.createTouchDivAndAddToParent('touch-rightTop', container);
		
		Utils.createTouchDivAndAddToParent('touch-left', container);
		Utils.createTouchDivAndAddToParent('touch-center', container);
		Utils.createTouchDivAndAddToParent('touch-right', container);
		
		Utils.createTouchDivAndAddToParent('touch-leftBottom', container);
		Utils.createTouchDivAndAddToParent('touch-bottom', container);
		Utils.createTouchDivAndAddToParent('touch-rightBottom', container);

		window.document.body.appendChild(container);
	}

	cancelTouches() {
		window.keyDown[KEY_DOWN] = false;
		window.keyDown[KEY_UP] = false;
		window.keyDown[KEY_LEFT] = false;
		window.keyDown[KEY_RIGHT] = false;
		window.keyDown[KEY_SPACE] = false;
		window.lastKeyCodeDown = 0;
	}
	
	touchStart(event) {
		var timeStamp = new Date(),
			t = timeStamp.getTime() - this.startTimeStamp.getTime();
	
		this.startTimeStamp = new Date();
		  event.preventDefault();
		  event.stopPropagation();
			
		this.currentBaseTouch = event.targetTouches[event.targetTouches.length-1];
	
		this.lastTouchMoveX = event.targetTouches[0].pageX;
		this.lastTouchMoveY = event.targetTouches[0].pageY;
		this.baseTouchMoveX = event.targetTouches[0].pageX;
        this.baseTouchMoveY = event.targetTouches[0].pageY;
        
        if (this.lastTouchMoveY >= 0 && this.lastTouchMoveY < SCREEN_RES_Y) { 
            window.keyDown[KEY_UP] = true;
        }

        if (this.lastTouchMoveY >= (2 * SCREEN_RES_Y)) { 
            window.keyDown[KEY_DOWN] = true;
        }

        if (this.lastTouchMoveX >= 0 && this.lastTouchMoveX < SCREEN_RES_X) { 
            window.keyDown[KEY_LEFT] = true;
        }

        if (this.lastTouchMoveX >= (2 * SCREEN_RES_X)) { 
            window.keyDown[KEY_RIGHT] = true;
        }	}
	
	touchMove(event) {

	}
	
	touchEnd(event) {
	}

	initialise() {
        document.addEventListener('touchstart', this.touchStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.touchMove.bind(this), false); 
        document.addEventListener('touchend', this.touchEnd.bind(this), false); 
	}
}

export default TouchController;