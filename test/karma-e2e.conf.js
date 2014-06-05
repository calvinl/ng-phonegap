'use strict';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['ng-scenario'],
    files: ['e2e/**/*.js'],
    exclude: [],
    plugins: ['karma-ng-scenario', 'karma-chrome-launcher'],
    port: 8000,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    proxies: {
      '/': 'http://localhost:9001/'
    },
    urlRoot: '/_karma_/'
  });
};
