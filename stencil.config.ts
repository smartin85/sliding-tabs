import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'sliding-tabs',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ],
  bundles: [
    {
      components: [
        'sliding-tabs', 
        'sliding-tab', 
        'sliding-tabs-button', 
        'sliding-tabs-content', 
        'sliding-tabs-indicator', 
        'sliding-tabs-toolbar'
      ]
    }
  ],
  plugins: [
    sass()
  ]
};
