/*
 * config/router.js
 *
 * Defines the routes for the application.
 *
 */
angular.module(_APP_).config([
  '$routeProvider',
  function($routeProvider) {

    // Define routes here.
    $routeProvider
      .when('/', {
        templateUrl: 'html/partials/home/index.html',
        controller: 'HomeController'
      })
      .otherwise({ redirectTo: '/' });

  }
]);

