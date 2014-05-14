'use strict';

/* jshint -W106 */
/* jshint -W117 */

describe('Controller: HomeController', function(){
  var scope, controller;
  var expected = 'Hello World!';

  beforeEach(module(_APP_));

	beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    controller = $controller('HomeController', {
        $scope: scope
    });
    scope.$digest();
  }));

  afterEach(function(){
  });

  it('It should return \'' + expected + '\'', function(){
      expect(scope.text).toBe(expected);
  });
});