import { newE2EPage } from '@stencil/core/testing';

describe('sliding-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sliding-tabs></sliding-tabs>');

    const element = await page.find('sliding-tabs');
    expect(element).toHaveClass('hydrated');
  });
});
