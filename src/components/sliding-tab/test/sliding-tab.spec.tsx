import { newSpecPage } from '@stencil/core/testing';
import { SlidingTab } from '../sliding-tab';

describe('sliding-tab', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SlidingTab],
      html: `<sliding-tab></sliding-tab>`,
    });
    expect(page.root).toEqualHtml(`
      <sliding-tab>
        <div class="sliding-tab-container"></div>
      </sliding-tab>
    `);
  });
});
