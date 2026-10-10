// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build
export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightThemeBlack({
          // --- NAVLINKS FIXED CONTEXT ---
          navLinks: [
            {
              label: 'Docs',
              link: '/overview/overview',
            },
            {
              label: 'About',
              link: '/overview/aboutus', // FIX: Set completely to lowercase to match your file position precisely!
            }
          ],

          // Securely locks dark mode theme layer parameters inside the plugin engine
          disableDarkmodeToggle: true,
        }),
      ],
      title: 'Hive Vision',
      head: [
        {
          tag: 'script',
          attrs: {
            src: '/honeycomb.js',
            type: 'module',
          },
        },
      ],
      customCss: ['./src/styles/global.css'],
      // --- UPDATED SOCIAL LINKS FOR NEW TAB BEHAVIOR ---
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com', target: '_blank' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg', target: '_blank' }
      ],
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
            { label: 'Webcam', slug: 'installation/webcam'}
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
