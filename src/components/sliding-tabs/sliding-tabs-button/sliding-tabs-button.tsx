import { Component, Prop, Element, Event, EventEmitter, Method } from '@stencil/core';

@Component({
	tag: 'sliding-tabs-button',
	styleUrl: 'sliding-tabs-button.scss'
})
export class SlidingTabsButton {
	@Prop() active: boolean;
	@Element() element: HTMLElement;

	@Prop() forTab: string;

	@Event({bubbles: true}) slidingTabsActiveTabChange: EventEmitter;
	@Event({bubbles: true}) slidingTabsButtonLoaded: EventEmitter;

	@Method()
	getElement() {
		return this.element;
	}

	componentDidLoad() {
		this.slidingTabsButtonLoaded.emit(this);
	}
	
	render() {
		if(this.active) {
			this.element.classList.add('active');
		} else {
			this.element.classList.remove('active');
		}
		return (
			<div class="sliding-tabs-button" onClick={() => this.slidingTabsActiveTabChange.emit(this.forTab)}>
				<slot />
			</div>
		);
	}
}