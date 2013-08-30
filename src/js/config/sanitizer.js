/*
 * config/sanitizer.js
 *
 * Defines the regex for link sanitation.
 *
 */
angular.module(_APP_).config([
  '$compileProvider',
  function($compileProvider) {

    // sanitize white list for angular/phonegap
    var sanitation = new RegExp('^\s*(https?|ftp|mailto|file|tel|comgooglemaps|sms):');
    $compileProvider.aHrefSanitizationWhitelist(sanitation);
  }
]);
