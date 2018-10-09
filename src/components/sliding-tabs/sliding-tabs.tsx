import { Component, Element, Event, EventEmitter, Listen, State, Prop } from '@stencil/core';
import { SlidingTabsContent } from './sliding-tabs-content/sliding-tabs-content';
import { SlidingTabsToolbar } from './sliding-tabs-toolbar/sliding-tabs-toolbar';

@Component({
	tag: 'sliding-tabs',
	styleUrl: 'sliding-tabs.scss'
})
export class ScrollTabs {
	private _toolbar: SlidingTabsToolbar;
	private _content: SlidingTabsContent;

	@Element() element: HTMLElement;
	@Event() tabChanged: EventEmitter;
	@Prop({ mutable: true }) activeTabIndex?: number;
	@Prop({ mutable: true }) activeTab?: string;
	
	@State() tabs: string[] = [];

	@Listen('slidingTabsTabLoaded', { capture: true })
	handleTabLoaded() {
		this.tabs !== null && this.initTabs();
	}

	@Listen('slidingTabsPanIndexChange', { capture: true })
	handlePanIndexChange(ev: CustomEvent) {
		if(this._toolbar) {
			if (ev.detail !== null) {
				this._toolbar.setActiveTab(this.tabs[ev.detail], ev.detail);
				this._toolbar.movePanIndicator(null);
			} else {
				this._toolbar.movePanIndicator();
			}
		}		
	}

	@Listen('slidingTabsPanChange', {capture: true})
	handlePanChange(ev: CustomEvent) {
		if(this._toolbar) {
			this._toolbar.movePanIndicator(ev.detail);
		}		
	}

	@Listen('slidingTabsContentLoaded', {capture: true})
	handleTabsContentLoaded(ev: CustomEvent<SlidingTabsContent>) {
		this._content = ev.detail;
	}

	@Listen('slidingTabsToolbarLoaded', {capture: true})
	handleTabsToolbarLoaded(ev: CustomEvent<SlidingTabsToolbar>) {
		this._toolbar = ev.detail;
	}

	@Listen('slidingTabsActiveTabChange', {capture: true})
	handleTabChange(ev: CustomEvent<string>) {
		this.setActiveTabIndex(this.tabs.findIndex(t => t === ev.detail));
	}

	componentDidLoad() {
		this.initTabs();
	}

	componentDidUpdate() {
		if(this.activeTabIndex !== this.tabs.indexOf(this.activeTab)) {
			this.setActiveTabIndex(this.tabs.indexOf(this.activeTab));
		}
	}

	private setActiveTabIndex(index: number) {
		if(this.tabs[index]) {
			this.activeTabIndex = index;
			this.activeTab = this.tabs[index];
			if(this._toolbar) {
				this._toolbar.movePanIndicator();
				this._toolbar.setActiveTab(this.tabs[index], this.activeTabIndex);
			}
			if(this._content) {
				this._content.activeTabIndex = this.activeTabIndex;
			}
			this.tabChanged.emit({name: this.tabs[index], index: index});
		}		
	}

	private initTabs() {
		let tabs = this.element.querySelectorAll('sliding-tab');
		this.tabs = [];

		for (let i = 0; i < tabs.length; i++) {
			tabs[i].setStateHandler((name: string) => this.setTabName(i, name));
		}
		if(this.activeTab) {
			this.activeTabIndex = this.tabs.indexOf(this.activeTab) || 0;
		}
		if (tabs.length) {
			this.setActiveTabIndex(this.activeTabIndex || 0);
		}
	}

	private setTabName(index: number, name: string) {
		if (!name) {
			return this.initTabs();
		}
		let newState = [...this.tabs];

		if (name) {
			newState[index] = name;
		} else {
			newState.splice(index, 1);
		}
		this.tabs = newState.filter(t => !!t);
		this._content && (this._content.tabs = this.tabs);
		this._toolbar && (this._toolbar.tabs = this.tabs);
	}

	render() {
		return (
			<div class="sliding-tabs-container">
				<slot />
			</div>
		);
	}
}