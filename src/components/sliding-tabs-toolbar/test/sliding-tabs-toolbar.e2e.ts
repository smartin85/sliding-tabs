import { newE2EPage } from '@stencil/core/testing';

describe('sliding-tabs-toolbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sliding-tabs-toolbar></sliding-tabs-toolbar>');

    const element = await page.find('sliding-tabs-toolbar');
    expect(element).toHaveClass('hydrated');
  });
});
