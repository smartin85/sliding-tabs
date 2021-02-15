import { newSpecPage } from '@stencil/core/testing';
import { SlidingTabs } from '../sliding-tabs';

describe('sliding-tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SlidingTabs],
      html: `<sliding-tabs></sliding-tabs>`,
    });
    expect(page.root).toEqualHtml(`
      <sliding-tabs>
        <div class="sliding-tabs-container"></div>
      </sliding-tabs>
    `);
  });
});
