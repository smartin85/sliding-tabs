import { Component, Host, h, Prop, Element, Event, EventEmitter, Method } from '@stencil/core';

@Component({
	tag: 'sliding-tabs-button',
	styleUrl: 'sliding-tabs-button.css',
	shadow: false,
})
export class SlidingTabsButton {
	@Prop() active: boolean;
	@Element() element: HTMLSlidingTabsButtonElement;

	@Prop() forTab: string;

	@Event({ bubbles: true }) slidingTabsActiveTabChange: EventEmitter;
	@Event({ bubbles: true }) slidingTabsButtonLoaded: EventEmitter;

	@Method()
	async getElement(): Promise<HTMLSlidingTabsButtonElement> {
		return this.element;
	}

	componentWillLoad() {
		this.slidingTabsButtonLoaded.emit(this);
	}

	render() {
		if (this.active) {
			this.element.classList.add('active');
		} else {
			this.element.classList.remove('active');
		}
		return (
			<Host>
				<div class="sliding-tabs-button" onClick={() => this.slidingTabsActiveTabChange.emit(this.forTab)}>
					<slot></slot>
				</div>
			</Host>
		);
	}

}
