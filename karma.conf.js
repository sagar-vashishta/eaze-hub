module.exports = function karmaConfig (config) {
  config.set({
    frameworks: [
      'jasmine'
    ],
    reporters: [
      'progress',
      'coverage'
    ],
    files: [
      'src/tests.webpack.js'
    ],
    preprocessors: {
      'src/tests.webpack.js': ['webpack', 'sourcemap']
    },
    browsers: [
      'PhantomJS'
    ],
    singleRun: true,

    // configure code coverage reporter
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'}
      ]
    },

    webpack: require('./webpack.config'),

    // hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  });
};
