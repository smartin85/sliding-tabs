import { newSpecPage } from '@stencil/core/testing';
import { SlidingTabsContent } from '../sliding-tabs-content';

describe('sliding-tabs-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SlidingTabsContent],
      html: `<sliding-tabs-content></sliding-tabs-content>`,
    });
    expect(page.root).toEqualHtml(`
      <sliding-tabs-content>
        <div class="sliding-tabs-content">
            <div class="sliding-tabs-scrollarea" style="left: 0%;"></div>
        </div>
      </sliding-tabs-content>
    `);
  });
});
