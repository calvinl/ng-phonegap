'use strict';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      '../vendor/angular/angular.js',
      '../vendor/angular-route/angular-route.js',
      '../vendor/angular-touch/angular-touch.js',
      '../vendor/angular-mocks/angular-mocks.js',
      '../app/www/js/config/*.js',
      '../app/www/js/*.js',
      'unit/**/*.js'
    ],
    exclude: [
      '../app/www/js/vendor.js'
    ],
    plugins:[
      'karma-firefox-launcher',
      'karma-jasmine'      
    ],    
    port: 8080,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: true
  });
};
