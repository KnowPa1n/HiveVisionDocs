// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightThemeBlack({
          navLinks: [{
            label: 'Docs',
            link: '/overview/overview',
          }],
        }),
      ],
      title: 'Hive Vision',
      customCss: ['./src/styles/global.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/sidhuharjas/Hive-Vison' }],
      sidebar: [
        {
          label: 'Overview',
          items: [
            { label: 'What is Hive Vision?', slug: 'overview/overview' },
          ],
        },
        {
          label: 'Installation',
          items: [
            { label: 'Limelight 3a', slug: 'installation/limelight' },
          ],
        },
        {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});