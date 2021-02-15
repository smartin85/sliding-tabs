import { newE2EPage } from '@stencil/core/testing';

describe('sliding-tabs-indicator', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sliding-tabs-indicator></sliding-tabs-indicator>');

    const element = await page.find('sliding-tabs-indicator');
    expect(element).toHaveClass('hydrated');
  });
});
