import { newSpecPage } from '@stencil/core/testing';
import { SlidingTabsIndicator } from '../sliding-tabs-indicator';

describe('sliding-tabs-indicator', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SlidingTabsIndicator],
      html: `<sliding-tabs-indicator></sliding-tabs-indicator>`,
    });
    expect(page.root).toEqualHtml(`
      <sliding-tabs-indicator>
         <div class="sliding-tabs-indicator-container">
           <div class="sliding-tabs-indicator"></div>
         </div>
      </sliding-tabs-indicator>
    `);
  });
});
