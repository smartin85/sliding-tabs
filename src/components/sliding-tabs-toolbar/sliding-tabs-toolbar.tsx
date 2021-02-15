import { Component, Host, h, Element, Event, EventEmitter, State, Prop, Listen, Method } from '@stencil/core';
import { PanGesture } from '../../utils/pan-gesture';
import { SlidingTabsIndicator } from '../sliding-tabs-indicator/sliding-tabs-indicator';

@Component({
	tag: 'sliding-tabs-toolbar',
	styleUrl: 'sliding-tabs-toolbar.css',
	shadow: false,
})
export class SlidingTabsToolbar {
	private _buttonContainer: HTMLElement;
	private _buttons: HTMLSlidingTabsButtonElement[] = [];
	private _containerElement: HTMLElement;
	private _panGesture: PanGesture;
	private _panIndicator: SlidingTabsIndicator;
	private _wheelHandler = (ev: WheelEvent) => this.handleWheel(ev);

	@Element() element: HTMLElement;
	@State() activeTabIndex?: number;
	@State() tabs: string[];
	@Prop() scrollable: boolean;
	@Prop() indicatorPlacement: 'top' | 'bottom';
	@Prop() activeTabPosition?: 'left' | 'center' | 'right';

	@Event() slidingTabsToolbarLoaded: EventEmitter;

	@Listen('slidingTabsButtonLoaded', { capture: true })
	handleTabsButtonLoaded() {
		let elements = this.element.querySelectorAll('sliding-tabs-button');
		this._buttons = [];
		for (let i = 0; i < elements.length; i++) {
			this._buttons.push(elements[i])
		}
	}

	@Listen('slidingTabsIndicatorLoaded', { capture: true })
	handleIndicatorLoaded(ev: CustomEvent<SlidingTabsIndicator>) {
		this._panIndicator = ev.detail;
	}

	@Method()
	async setActiveTab(name: string, index?: number) {
		index = index || (this.tabs && this.tabs.indexOf(name));
		this.activeTabIndex = index;
		this._buttons.forEach(b => b.active = b.forTab === name);
		this._panIndicator && (this._panIndicator.activeTabIndex = this.activeTabIndex);
		this.scrollToButton(name);
	}

	@Method()
	async movePanIndicator(val?: number) {
		if (this._panIndicator) {
			this._panIndicator.setButtons(this._buttons);
			this._panIndicator.movePanIndicator(val);
		}
	}

	@Method()
	async scrollToButton(name: string) {
		const target = this._buttons.find(b => b.forTab === name);

		if (target) {
			const minX = (this._containerElement.offsetWidth - this._buttonContainer.scrollWidth);
			let button = await target.getElement(),
				newX = this._buttonContainer.offsetLeft;

			if (this.activeTabPosition === 'left') {
				newX = -target.offsetLeft;
			} else if (this.activeTabPosition === 'center') {
				newX = -target.offsetLeft + this._containerElement.offsetWidth / 2 - target.offsetWidth / 2;
			} else if (this.activeTabPosition === 'right') {
				newX = this._buttonContainer.offsetWidth - button.offsetLeft - button.offsetWidth;
			} else if (button.offsetLeft + button.offsetWidth > this._buttonContainer.offsetWidth) {
				newX = this._buttonContainer.offsetWidth - button.offsetLeft - button.offsetWidth;
			} else if (button.offsetLeft < -this._buttonContainer.offsetLeft) {
				newX = -button.offsetLeft;
			}

			newX = newX < minX ? minX : newX > 0 ? 0 : newX;
			this._buttonContainer.style.left = newX + 'px';
		}
	}

	@Method()
	async scrollToRight() {
		const targetRef = this._buttonContainer.offsetWidth - this._buttonContainer.offsetLeft - this._containerElement.offsetWidth / 2;
		const target = this._buttons.find(b => b.offsetLeft > targetRef);
		if (target) {
			this.scrollToButton(target.forTab);
		}
	}

	@Method()
	async scrollToLeft() {
		const targetRef = this._buttonContainer.offsetWidth - this._buttonContainer.offsetLeft - this._containerElement.offsetWidth / 2;
		const targets = this._buttons.filter(b =>b.offsetLeft + b.offsetWidth < targetRef);
		if (targets.length) {
			this.scrollToButton(targets[targets.length - 1].forTab);
		}
	}

	@Method()
	async scrollToPrevious() {
		const target = this._buttons[this.activeTabIndex + 1];
		if (target) {
			this.scrollToButton(target.forTab);
		}
	}

	componentDidLoad() {
		this._panGesture = new PanGesture(this._buttonContainer);
		this.movePanIndicator();
		this.slidingTabsToolbarLoaded.emit(this);
		this.initWheelHandler();
	}

	componentDidUpdate() {
		this.movePanIndicator();
		this.initWheelHandler();
	}

	disconnectedCallback() {
		this._panGesture.unsubscribe();
		this.initWheelHandler();
	}

	private initWheelHandler() {
		if (this._buttonContainer) {
			this._buttonContainer.removeEventListener('wheel', this._wheelHandler);
			if (this.scrollable) {
				this._buttonContainer.addEventListener('wheel', this._wheelHandler);
			}
		}
	}

	private handleWheel(ev: WheelEvent) {
		const minX = (this._containerElement.offsetWidth - this._buttonContainer.scrollWidth);
		let newX = this._buttonContainer.offsetLeft + (ev.deltaY || ev.deltaX);
		newX = newX < minX ? minX : newX > 0 ? 0 : newX;
		this._buttonContainer.style.left = newX + 'px';
	}

	render() {
		const containerClasses = `sliding-tabs-toolbar-col sliding-tabs-button-row ${this.scrollable ? 'sliding-tabs-scrollable' : ''}`;

		return (
			<Host>
				<div class="sliding-tabs-toolbar-wrapper">
					<div class="sliding-tabs-toolbar-col">
						<slot name="toolbar-left"></slot>
					</div>
					<div class={containerClasses} ref={el => this._containerElement = el}>
						<div class="sliding-tabs-buttons-container" ref={el => this._buttonContainer = el}>
							{this.indicatorPlacement === 'top' && <sliding-tabs-indicator><slot name="indicator"></slot></sliding-tabs-indicator>}
							<div class="sliding-tabs-buttons">
								<slot></slot>
							</div>
							{this.indicatorPlacement === 'bottom' && <sliding-tabs-indicator><slot name="indicator"></slot></sliding-tabs-indicator>}
						</div>
					</div>
					<div class="sliding-tabs-toolbar-col">
						<slot name="toolbar-right"></slot>
					</div>
				</div>
			</Host>
		);
	}

}
