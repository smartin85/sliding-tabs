import { newE2EPage } from '@stencil/core/testing';

describe('sliding-tabs-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sliding-tabs-content></sliding-tabs-content>');

    const element = await page.find('sliding-tabs-content');
    expect(element).toHaveClass('hydrated');
  });
});
