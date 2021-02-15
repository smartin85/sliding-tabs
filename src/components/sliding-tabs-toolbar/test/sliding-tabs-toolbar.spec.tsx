import { newSpecPage } from '@stencil/core/testing';
import { SlidingTabsToolbar } from '../sliding-tabs-toolbar';

describe('sliding-tabs-toolbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SlidingTabsToolbar],
      html: `<sliding-tabs-toolbar></sliding-tabs-toolbar>`,
    });
    expect(page.root).toEqualHtml(`
      <sliding-tabs-toolbar>
         <div class="sliding-tabs-toolbar-wrapper">
           <div class="sliding-tabs-toolbar-col"></div>
           <div class="sliding-tabs-button-row sliding-tabs-toolbar-col">
             <div class="sliding-tabs-buttons-container">
               <div class="sliding-tabs-buttons"></div>
             </div>
           </div>
           <div class="sliding-tabs-toolbar-col"></div>
         </div>
      </sliding-tabs-toolbar>
    `);
  });
});
