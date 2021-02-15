/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SlidingTab {
        "setStateHandler": (handler: (tabName?: string) => void) => Promise<void>;
        "tabName": string;
    }
    interface SlidingTabs {
        "activeTab"?: string;
        "activeTabIndex"?: number;
    }
    interface SlidingTabsButton {
        "active": boolean;
        "forTab": string;
        "getElement": () => Promise<HTMLSlidingTabsButtonElement>;
    }
    interface SlidingTabsContent {
        "dragThreshold"?: number;
        "flickDistance"?: number;
    }
    interface SlidingTabsIndicator {
        "movePanIndicator": (percentage?: number) => Promise<void>;
        "setButtons": (buttons: HTMLElement[]) => Promise<void>;
    }
    interface SlidingTabsToolbar {
        "activeTabPosition"?: 'left' | 'center' | 'right';
        "indicatorPlacement": 'top' | 'bottom';
        "movePanIndicator": (val?: number) => Promise<void>;
        "scrollToButton": (name: string) => Promise<void>;
        "scrollToLeft": () => Promise<void>;
        "scrollToPrevious": () => Promise<void>;
        "scrollToRight": () => Promise<void>;
        "scrollable": boolean;
        "setActiveTab": (name: string, index?: number) => Promise<void>;
    }
}
declare global {
    interface HTMLSlidingTabElement extends Components.SlidingTab, HTMLStencilElement {
    }
    var HTMLSlidingTabElement: {
        prototype: HTMLSlidingTabElement;
        new (): HTMLSlidingTabElement;
    };
    interface HTMLSlidingTabsElement extends Components.SlidingTabs, HTMLStencilElement {
    }
    var HTMLSlidingTabsElement: {
        prototype: HTMLSlidingTabsElement;
        new (): HTMLSlidingTabsElement;
    };
    interface HTMLSlidingTabsButtonElement extends Components.SlidingTabsButton, HTMLStencilElement {
    }
    var HTMLSlidingTabsButtonElement: {
        prototype: HTMLSlidingTabsButtonElement;
        new (): HTMLSlidingTabsButtonElement;
    };
    interface HTMLSlidingTabsContentElement extends Components.SlidingTabsContent, HTMLStencilElement {
    }
    var HTMLSlidingTabsContentElement: {
        prototype: HTMLSlidingTabsContentElement;
        new (): HTMLSlidingTabsContentElement;
    };
    interface HTMLSlidingTabsIndicatorElement extends Components.SlidingTabsIndicator, HTMLStencilElement {
    }
    var HTMLSlidingTabsIndicatorElement: {
        prototype: HTMLSlidingTabsIndicatorElement;
        new (): HTMLSlidingTabsIndicatorElement;
    };
    interface HTMLSlidingTabsToolbarElement extends Components.SlidingTabsToolbar, HTMLStencilElement {
    }
    var HTMLSlidingTabsToolbarElement: {
        prototype: HTMLSlidingTabsToolbarElement;
        new (): HTMLSlidingTabsToolbarElement;
    };
    interface HTMLElementTagNameMap {
        "sliding-tab": HTMLSlidingTabElement;
        "sliding-tabs": HTMLSlidingTabsElement;
        "sliding-tabs-button": HTMLSlidingTabsButtonElement;
        "sliding-tabs-content": HTMLSlidingTabsContentElement;
        "sliding-tabs-indicator": HTMLSlidingTabsIndicatorElement;
        "sliding-tabs-toolbar": HTMLSlidingTabsToolbarElement;
    }
}
declare namespace LocalJSX {
    interface SlidingTab {
        "onSlidingTabLoaded"?: (event: CustomEvent<any>) => void;
        "tabName"?: string;
    }
    interface SlidingTabs {
        "activeTab"?: string;
        "activeTabIndex"?: number;
        "onTabChanged"?: (event: CustomEvent<any>) => void;
    }
    interface SlidingTabsButton {
        "active"?: boolean;
        "forTab"?: string;
        "onSlidingTabsActiveTabChange"?: (event: CustomEvent<any>) => void;
        "onSlidingTabsButtonLoaded"?: (event: CustomEvent<any>) => void;
    }
    interface SlidingTabsContent {
        "dragThreshold"?: number;
        "flickDistance"?: number;
        "onSlidingTabsActiveTabChange"?: (event: CustomEvent<any>) => void;
        "onSlidingTabsContentLoaded"?: (event: CustomEvent<any>) => void;
        "onSlidingTabsPanChange"?: (event: CustomEvent<any>) => void;
        "onSlidingTabsPanIndexChange"?: (event: CustomEvent<any>) => void;
    }
    interface SlidingTabsIndicator {
        "onSlidingTabsIndicatorLoaded"?: (event: CustomEvent<any>) => void;
    }
    interface SlidingTabsToolbar {
        "activeTabPosition"?: 'left' | 'center' | 'right';
        "indicatorPlacement"?: 'top' | 'bottom';
        "onSlidingTabsToolbarLoaded"?: (event: CustomEvent<any>) => void;
        "scrollable"?: boolean;
    }
    interface IntrinsicElements {
        "sliding-tab": SlidingTab;
        "sliding-tabs": SlidingTabs;
        "sliding-tabs-button": SlidingTabsButton;
        "sliding-tabs-content": SlidingTabsContent;
        "sliding-tabs-indicator": SlidingTabsIndicator;
        "sliding-tabs-toolbar": SlidingTabsToolbar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "sliding-tab": LocalJSX.SlidingTab & JSXBase.HTMLAttributes<HTMLSlidingTabElement>;
            "sliding-tabs": LocalJSX.SlidingTabs & JSXBase.HTMLAttributes<HTMLSlidingTabsElement>;
            "sliding-tabs-button": LocalJSX.SlidingTabsButton & JSXBase.HTMLAttributes<HTMLSlidingTabsButtonElement>;
            "sliding-tabs-content": LocalJSX.SlidingTabsContent & JSXBase.HTMLAttributes<HTMLSlidingTabsContentElement>;
            "sliding-tabs-indicator": LocalJSX.SlidingTabsIndicator & JSXBase.HTMLAttributes<HTMLSlidingTabsIndicatorElement>;
            "sliding-tabs-toolbar": LocalJSX.SlidingTabsToolbar & JSXBase.HTMLAttributes<HTMLSlidingTabsToolbarElement>;
        }
    }
}
