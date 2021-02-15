
export class PanGesture {
	private _startX: number;
	private _startY: number;
	private _startPos: number;
	private _minX: number;
	private _refElement
	private _subscription: (shiftPercentage: number) => void;
	private _onStart: () => void;
	private _onEnd: (shiftPercentage: number) => void;
	private _touchStart = (ev) => this.onTouchStart(ev);
	private _touchMove = (ev) => this.onTouchMove(ev);
	private _touchEnd = (ev) => this.onTouchEnd(ev);
	private _onFlick: (direction: number) => void;
	private _longPress: boolean;
	private _flickTimer;
	private _avoidPanning: boolean;

	constructor(private _element: HTMLElement, private dragThreshold: number = 20, private flickDistance: number = 50) {
		let ref = this._element.parentElement;
		while(ref && !ref.offsetWidth) {
			ref = ref.parentElement;
		}
		this._refElement = ref;
		this._element.addEventListener('touchstart', this._touchStart);
		this._element.addEventListener('touchmove', this._touchMove);
		this._element.addEventListener('touchend', this._touchEnd);		
	}

	public subscribe(subscriber: (shiftPercentage: number) => void) {		
		this._subscription = subscriber;
	}

	public unsubscribe() {
		this._element.removeEventListener('touchstart', this._touchStart);
		this._element.removeEventListener('touchmove', this._touchMove);
		this._element.removeEventListener('touchend', this._touchEnd);
	}

	public onStart(action: () => void) {
		this._onStart = action;
	}

	public onEnd(action: (shiftPercentage: number) => void) {
		this._onEnd = action;
	}

	public onFlick(action: (direction: number) => void) {
		this._onFlick = action;
	}

	public undo() {
		this._element.style.left = this._startPos + 'px';
	}

	private onTouchStart(ev: TouchEvent) {
		clearTimeout(this._flickTimer);
		this._avoidPanning = false;
		this._longPress = false;
		this._flickTimer = setTimeout(() => this._longPress = true, 250);
		this._minX = this._refElement.offsetWidth - this._element.scrollWidth;
		this._startX = ev.touches.item(0).clientX;
		this._startY = ev.touches.item(0).clientY;
		this._startPos = this._element.offsetLeft;
		this._onStart && this._onStart();
	}

	private onTouchMove(ev: TouchEvent) {
		var coords = ev.touches.item(0),
			delta = Math.abs(coords.clientX - this._startX);

		if(Math.abs(coords.clientY - this._startY) < delta && delta && !this._avoidPanning && delta > this.dragThreshold) {
			if(this.isContentScrolled(ev.target)) {
				var newPos = this._startPos + (coords.clientX - this._startX);
	
				if(newPos > 0) {
					newPos = 0;			
				} 
				if(newPos < this._minX) {
					newPos = this._minX;
				}
		
				this._element.style.left = newPos + 'px';
				this._subscription && this._subscription(this._element.offsetLeft / this._minX);
			} else {
				this._avoidPanning = true;
				this.undo();
				this._subscription && this._subscription(this._element.offsetLeft / this._minX);
			}	
		}		
	}

	private onTouchEnd(ev: TouchEvent) {
		clearTimeout(this._flickTimer);
		if(!this._longPress) {
			let newX = ev.changedTouches.item(0).clientX;
			if(this._onFlick && Math.abs(newX - this._startX) > this.flickDistance) {
				this._onFlick(newX < this._startX ? 1 : -1);
				return;
			}
		}
		this._onEnd && !this._avoidPanning && this._onEnd(this._element.offsetLeft / this._minX);	 
	}

	private isContentScrolled(element) {
		while(element && element !== this._element) {
			if(element.scrollLeft && element.scrollLeft + element.offsetWidth !== element.scrollWidth) {
				return false;
			}
			element = element.parentElement;
		}
		return true;
	}
}