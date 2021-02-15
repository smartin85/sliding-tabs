import { Component, Host, h, State, Event, EventEmitter, Method } from '@stencil/core';

@Component({
	tag: 'sliding-tabs-indicator',
	styleUrl: 'sliding-tabs-indicator.css',
	shadow: false,
})
export class SlidingTabsIndicator {
	private _indicator: HTMLElement;
	private _buttons: HTMLElement[];

	@State() activeTabIndex: number;
	@Event({ bubbles: true }) slidingTabsIndicatorLoaded: EventEmitter;

	@Method()
	async movePanIndicator(percentage?: number) {
		if (this._buttons && typeof this.activeTabIndex === 'number' && this._buttons[this.activeTabIndex]) {
			if (typeof percentage === 'number') {
				let offset = (this._buttons.length - 1) * percentage - this.activeTabIndex,
					left = this._buttons[this.activeTabIndex].offsetLeft,
					width = this._buttons[this.activeTabIndex].offsetWidth,
					sibling = offset !== 0 ? this._buttons[this.activeTabIndex + (offset < 0 ? -1 : 1)] : null;

				if (sibling) {
					offset = Math.abs(offset);
					width = width * (1 - offset) + sibling.offsetWidth * offset;
					left = left * (1 - offset) + sibling.offsetLeft * offset;
				}

				this._indicator.classList.add('sliding-tabs-no-transition');
				this._indicator.style.width = width + 'px';
				this._indicator.style.left = left + 'px';
			} else if (percentage !== null) {
				// Tab-Index changed
				this._indicator.classList.remove('sliding-tabs-no-transition');
				this._indicator.style.left = this._buttons[this.activeTabIndex].offsetLeft + 'px';
				this._indicator.style.width = this._buttons[this.activeTabIndex].offsetWidth + 'px';
			}
		}
	}

	@Method()
	async setButtons(buttons: HTMLElement[]) {
		this._buttons = buttons;
	}

	componentWillLoad() {
		this.slidingTabsIndicatorLoaded.emit(this);
	}

	render() {
		return (
			<Host>
				<div class="sliding-tabs-indicator-container">
					<div class="sliding-tabs-indicator" ref={el => this._indicator = el}>
						<slot name="indicator"></slot>
					</div>
				</div>
			</Host>
		);
	}

}
