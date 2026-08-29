module.exports = api => {
  // Returns true if NODE_ENV is 'test' or 'commonjs'
  const isCjs = api.env(['test', 'commonjs']);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // Un-comment this line if you want Babel
          // to automatically inject core-js polyfills
          // useBuiltIns: 'usage',
          corejs: 3,

          // Force CommonJS for tests/CJS builds;
          // otherwise, let Babel manage it (or preserve ES modules)
          modules: isCjs ? 'commonjs' : false,

          // Fixed the duplicate key bug
          // by merging logic into
          // a single targets configuration
          targets: isCjs
            ? { node: 'current' }
            : {
                browsers: '> 0.25%, not dead',
                esmodules: true,
              },

          debug: false,
        },
      ],

      // CRITICAL: Strips out TypeScript types before code compilation
      '@babel/preset-typescript',
    ],
    plugins: ['preval'],
  };
};
