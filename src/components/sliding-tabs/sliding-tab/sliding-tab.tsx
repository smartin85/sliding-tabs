import { Component, Prop, Event, EventEmitter, Method } from '@stencil/core';

@Component({
	tag: 'sliding-tab',
	styleUrl: 'sliding-tab.scss'
})
export class SlidingTab {
	private _stateHandler?: (tabName?: string) => void;
	private _tabName: string;

	@Prop() tabName: string;
	@Event({bubbles: true, eventName: 'slidingTabLoaded'}) tabLoaded: EventEmitter;

	@Method()
	setStateHandler(handler: (tabName?: string) => void) {
		this._stateHandler = handler;
		this.publishState();
	}

	componentDidLoad() {
		this.tabLoaded.emit();
		this._tabName = this.tabName;
	}

	componentWillUpdate() {
		if(this._tabName === this.tabName) {
			return false;
		}
		this._tabName = this.tabName;
		this.publishState();
	}

	componentDidUnload() {
		this._stateHandler(null);
	}

	private publishState() {
		this._stateHandler(this.tabName);
	}
	
	render() {
		return (
			<div class="sliding-tab-container">
				<slot />
			</div>
		);
	}
}