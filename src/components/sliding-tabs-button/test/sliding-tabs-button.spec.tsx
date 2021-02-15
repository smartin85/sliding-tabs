import { newSpecPage } from '@stencil/core/testing';
import { SlidingTabsButton } from '../sliding-tabs-button';

describe('sliding-tabs-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SlidingTabsButton],
      html: `<sliding-tabs-button></sliding-tabs-button>`,
    });
    expect(page.root).toEqualHtml(`
      <sliding-tabs-button>
        <div class="sliding-tabs-button"></div>
      </sliding-tabs-button>
    `);
  });
});
