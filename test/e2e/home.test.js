'use strict';

/*jshint -W117 */

describe('Home page', function(){
  var el = '#for_e2e_test';
  var expected = 'Hello World!';

  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should show message', function() {
    expect(element(el).text()).toEqual(expected);  
  });
});