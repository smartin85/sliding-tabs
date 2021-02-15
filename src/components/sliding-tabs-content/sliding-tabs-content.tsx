import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { PanGesture } from '../../utils/pan-gesture';

@Component({
	tag: 'sliding-tabs-content',
	styleUrl: 'sliding-tabs-content.css',
	shadow: false,
})
export class SlidingTabsContent {
	private _currentPanIndex?: number;
	private _panGesture: PanGesture;
	private _tabScrollArea: HTMLElement;

	@Prop() dragThreshold?: number;
	@Prop() flickDistance?: number;

	@State() activeTabIndex?: number;
	@State() tabs: string[];

	@Event() slidingTabsPanIndexChange: EventEmitter;
	@Event() slidingTabsPanChange: EventEmitter;
	@Event() slidingTabsContentLoaded: EventEmitter;
	@Event({ bubbles: true }) slidingTabsActiveTabChange: EventEmitter;

	componentDidLoad() {
		this.initPanning();
		this.slidingTabsContentLoaded.emit(this);
	}

	disconnectedCallback() {
		this._panGesture.unsubscribe();
	}

	private initPanning() {
		this._panGesture = new PanGesture(this._tabScrollArea, this.dragThreshold, this.flickDistance);
		this._panGesture.onStart(() => {
			this._tabScrollArea.classList.add('sliding-tabs-no-transition');
		});
		this._panGesture.subscribe(val => {
			var newIndex = Math.round((this.tabs.length - 1) * val);
			if (newIndex !== this._currentPanIndex) {
				this._currentPanIndex = newIndex;
				this.slidingTabsPanIndexChange.emit(newIndex);
			}
			this.slidingTabsPanChange.emit(val);
		});
		this._panGesture.onEnd(val => {
			var newIndex = Math.round((this.tabs.length - 1) * val);
			this._tabScrollArea.classList.remove('no-transition');
			if (newIndex === this.activeTabIndex) {
				this._panGesture.undo();
			} else {
				this.slidingTabsActiveTabChange.emit(this.tabs[newIndex]);
			}
			this.slidingTabsPanIndexChange.emit(null);
		});
		this._panGesture.onFlick(dir => {
			const newIndex = this.activeTabIndex + dir;
			if (newIndex <= this.tabs.length - 1 && newIndex >= 0) {
				this.slidingTabsActiveTabChange.emit(this.tabs[newIndex]);
			}
		})
	}

	render() {
		return (
			<Host>
				<div class="sliding-tabs-content">
					<div class="sliding-tabs-scrollarea" ref={(el: HTMLElement) => this._tabScrollArea = el} style={{ left: (this.activeTabIndex ?? 0) * -100 + '%' }}>
						<slot></slot>
					</div>
				</div>
			</Host>
		);
	}

}
