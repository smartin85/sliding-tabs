[![Built With Stencil][stencil-image]][stencil-url]

# sliding-tabs

sliding-tabs is a web component buildt with [Stencil][stencil-url] for slideable tabs or just for a simple slider.

[Demo with fixed tabs](http://plnkr.co/edit/0LM6GJtEUdn6kY7eNk16?p=preview)

[Demo with scrollable tabs](http://plnkr.co/edit/BXhb0cF7vdHc66XFqol4?p=preview)

## Using this component

### Script tag

- Put `<script src='https://unpkg.com/sliding-tabs@latest/dist/sliding-tabs.js'></script>` in the head of your index.html
- Then you can use the component

### Node Modules
- Run `npm install sliding-tabs --save`
- Put a script tag similar to this `<script src='node_modules/sliding-tabs/dist/sliding-tabs.js></script>` in the head of your index.html
- Then you can use the component

### In a stencil-starter app
- Run `npm install sliding-tabs --save`
- Add `{ name: 'sliding-tabs' }` to your collections
- Then you can use the component

### In a Angular or Ionic Project
- Run `npm install sliding-tabs --save`
- Include the `CUSTOM_ELEMENTS_SCHEMA` in the modules that use the components
- Define the custom elements within your app by calling defineCustomElements(window) from main.ts (or some other appropriate place)

#### Including the Custom Elements Schema
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, SharedModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

#### Defining the Custom Elements
```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from 'sliding-tabs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
defineCustomElements(window);
```

## Usage

### As simple slider
Without the toolbar, you can use this component as a simple slider:

```html
<sliding-tabs>
    <sliding-tabs-content>
      <sliding-tab tab-name="a">Slide A</sliding-tab>
      <sliding-tab tab-name="b">Slide B</sliding-tab>
      <sliding-tab tab-name="c">Slide C</sliding-tab>
    </sliding-tabs-content>
  </sliding-tabs>
```

### With toolbar for tabs
```html
<sliding-tabs>
	<sliding-tabs-content>
		<sliding-tab tab-name="a">Content A</sliding-tab>
		<sliding-tab tab-name="b">Content B</sliding-tab>
		<sliding-tab tab-name="c">Content C</sliding-tab>
	</sliding-tabs-content>
	<sliding-tabs-toolbar>
		<sliding-tabs-button for-tab="a">
		Button A
		</sliding-tabs-button>
		<sliding-tabs-button for-tab="b">
		Button B
		</sliding-tabs-button>
		<sliding-tabs-button for-tab="c">
		Button C
		</sliding-tabs-button>
	</sliding-tabs-toolbar>
</sliding-tabs>
```

The toolbar can also be placed on top of the content:

```html
<sliding-tabs>
	<sliding-tabs-toolbar>
		<sliding-tabs-button for-tab="a">
		Button A
		</sliding-tabs-button>
		<sliding-tabs-button for-tab="b">
		Button B
		</sliding-tabs-button>
		<sliding-tabs-button for-tab="c">
		Button C
		</sliding-tabs-button>
	</sliding-tabs-toolbar>
	<sliding-tabs-content>
		<sliding-tab tab-name="a">Content A</sliding-tab>
		<sliding-tab tab-name="b">Content B</sliding-tab>
		<sliding-tab tab-name="c">Content C</sliding-tab>
	</sliding-tabs-content>    
</sliding-tabs>
```

You can add an indicator, which shows the current tab position relative to the buttons:

```html
<sliding-tabs>	
	<sliding-tabs-content>
		<sliding-tab tab-name="a">Content A</sliding-tab>
		<sliding-tab tab-name="b">Content B</sliding-tab>
		<sliding-tab tab-name="c">Content C</sliding-tab>
	</sliding-tabs-content>
	<sliding-tabs-toolbar indicator-placement="top">
		<div class="my-indicator" slot="indicator"></div>
		<sliding-tabs-button for-tab="a">
		Button A
		</sliding-tabs-button>
		<sliding-tabs-button for-tab="b">
		Button B
		</sliding-tabs-button>
		<sliding-tabs-button for-tab="c">
		Button C
		</sliding-tabs-button>
	</sliding-tabs-toolbar>
</sliding-tabs>
```

There are two more Slots you can use for additional buttons:

```html
<sliding-tabs>	
	<sliding-tabs-content>
		<sliding-tab tab-name="a">Content A</sliding-tab>
		<sliding-tab tab-name="b">Content B</sliding-tab>
		<sliding-tab tab-name="c">Content C</sliding-tab>
	</sliding-tabs-content>
	<sliding-tabs-toolbar indicator-placement="top" id="toolbar">
		<div class="my-indicator" slot="indicator"></div>
		<div slot="toolbar-left" class="pager-item" id="previous">&lt;</div>
      	<div slot="toolbar-right" class="pager-item" id="next">&gt;</div>
		<sliding-tabs-button for-tab="a">
		Button A
		</sliding-tabs-button>
		<sliding-tabs-button for-tab="b">
		Button B
		</sliding-tabs-button>
		<sliding-tabs-button for-tab="c">
		Button C
		</sliding-tabs-button>
	</sliding-tabs-toolbar>
</sliding-tabs>

<script>
	var toolbar = document.getElementById('toolbar');
	var previous = document.getElementById('previous');
	var next = document.getElementById('next');

	previous.addEventListener('click', () => toolbar.scrollToLeft());
	next.addEventListener('click', () => toolbar.scrollToRight());
</script>
```

## API

### sliding-tabs Element

#### Parameters
`active-tab-index`: The index of the active tab.

```html
<sliding-tabs active-tab-index="1">...</sliding-tabs>	
```

`active-tab`: The name of the active tab

```html
<sliding-tabs active-tab="c">...</sliding-tabs>
```

#### Events
`tabChanged`: Fires everytime a tab changed. The event contains a property details with the index and name of the current tab:
```typescript
interface tabChandedEvent {
	index: number;
	name: string;
}
```


### sliding-tabs-toolbar Element

#### Parameters
`indicator-placement`: Possible values are `top` (place indicator on top of the buttons) and `bottom` (place indicator to the bottom).

```html
<sliding-tabs-toolbar indicator-placement="bottom">...</sliding-tabs-toolbar>
```

`scrollable`: Enables swiping in the toolbar. This is usefull if you have a lot of tabs or buttons with large content.

```html
<sliding-tabs-toolbar scrollable="true">...</sliding-tabs-toolbar>
```


`active-tab-position`: The position of the active tab when `scrollable="true"`. Possible values are `left`, `center` and `right`.

```html
<sliding-tabs-toolbar scrollable="true" active-tab-position="center">...</sliding-tabs-toolbar>
```

### Methods on the DOM-Element
`scrollToButton(name: string)`: Scroll to a specific button (if `scrollable="true"`)

`scrollToLeft()`: Scroll the toolbar to the left (previous button).

`scrollToRight()`: Scroll the toolbar to the right (next button).

`setActiveTab()`: Switch to a specific tab.

## Changelog

### 1.1.0
* Added `active-tab` property to `scroll-tabs`
* Added `active-tab-position` property to `scroll-tabs-toolbar`
* Improved performance


[stencil-url]: https://stenciljs.com/
[stencil-image]: https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square