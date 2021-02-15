import { newE2EPage } from '@stencil/core/testing';

describe('sliding-tabs-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sliding-tabs-button></sliding-tabs-button>');

    const element = await page.find('sliding-tabs-button');
    expect(element).toHaveClass('hydrated');
  });
});
