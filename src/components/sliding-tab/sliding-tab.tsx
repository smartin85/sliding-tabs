import { Component, Host, h, Prop, Event, EventEmitter, Method } from '@stencil/core';

@Component({
	tag: 'sliding-tab',
	styleUrl: 'sliding-tab.css',
	shadow: false,
})
export class SlidingTab {
	private _stateHandler?: (tabName?: string) => void;
	private _tabName: string;

	@Prop({ reflect: true }) tabName: string;
	@Event({ bubbles: true, eventName: 'slidingTabLoaded' }) tabLoaded: EventEmitter;

	@Method()
	async setStateHandler(handler: (tabName?: string) => void) {
		this._stateHandler = handler;
		this.publishState();
	}

	componentWillLoad() {
		this.tabLoaded.emit();
		this._tabName = this.tabName;
	}

	componentWillUpdate() {
		if (this._tabName === this.tabName) {
			return false;
		}
		this._tabName = this.tabName;
		this.publishState();
	}

	disconnectedCallback() {
		this._stateHandler && this._stateHandler(null);
	}

	render() {
		return (
			<Host>
				<div class="sliding-tab-container">
					<slot></slot>
				</div>
			</Host>
		);
	}

	private publishState() {
		this._stateHandler(this.tabName);
	}

}
