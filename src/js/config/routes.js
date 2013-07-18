// Declare app level module
var app = angular.module(_APP_NAME_, [

  _CONTROLLERS_,
  _DIRECTIVES_,
  _FILTERS_,
  _MODULES_,
  _SERVICES_

]).config([
  '$compileProvider',
  '$routeProvider',
  '$locationProvider',
  function($compileProvider, $routeProvider, $locationProvider) {

    // sanitize white list for angular/phonegap
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|comgooglemaps|sms):/);

    // default routes
    $routeProvider
      .when('/example', {
        templateUrl: 'js/partials/example.html',
        controller: 'ExampleController'
      })
      .otherwise({ redirectTo: '/example' });

    // uncomment if you want real urls without hashbang
    // $locationProvider.html5Mode(true);
  }
]).run([
  '$rootScope',
  function($rootScope) {

    // initial run cycle

  }
]);





// create modules; leave these alone.
angular.module(_CONTROLLERS_, []);
angular.module(_DIRECTIVES_, []);
angular.module(_FILTERS_, []);
angular.module(_MODULES_, []);
angular.module(_SERVICES_, []);
