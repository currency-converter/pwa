import { resolve } from 'path';

const logoDir = 'assets/images/logo';

export default {
  name: 'Currency Converter',
  short_name: 'Currency Converter',
  description: 'A simple currency converter',
  start_url: './?source=webapp_manifest',
  scope: '/',
  background_color: '#fff',
  theme_color: '#000',
  icons: [
    {
      src: resolve(`${logoDir}/128.png`),
      sizes: '128x128',
      destination: logoDir
    },
    {
      src: resolve(`${logoDir}/256.png`),
      size: [144, 152, 192, 256],
      destination: logoDir
    },
    {
      src: resolve(`${logoDir}/512.png`),
      sizes: '512x512',
      destination: logoDir
    },
  ]
};
