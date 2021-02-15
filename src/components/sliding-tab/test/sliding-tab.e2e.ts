import { newE2EPage } from '@stencil/core/testing';

describe('sliding-tab', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sliding-tab></sliding-tab>');

    const element = await page.find('sliding-tab');
    expect(element).toHaveClass('hydrated');
  });
});
