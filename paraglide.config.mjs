/** @type {import('@inlang/paraglide-js').CompilerOptions} */
export const paraglideConfig = {
  project: './project.inlang',
  outdir: './src/paraglide',
  outputStructure: 'message-modules',
  // The site is English-only, including visits with a legacy locale cookie.
  strategy: ['baseLocale'],
  urlPatterns: [
    {
      pattern: '/:path(.*)?',
      localized: [['en', '/:path(.*)?']],
    },
  ],
};
