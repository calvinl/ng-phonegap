/* pg.js
 * This file is run from index.html, 
 * and is the intial phase in the run-cycle.
 * Use this file to do things before the
 * mobile device / PhoneGap's API methods
 * are ready to be used. It is also used to 
 * bootstrap angularjs.
 */

var pg = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {

    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {

      // bind deviceready callback for phonegap devices
      document.addEventListener('deviceready', this.onDeviceReady, true);

    } else {

      // running on desktop, just call device ready immediately
      this.onDeviceReady();

    }
  },
  onDeviceReady: function() {

    var _this = this;

    angular.element(document).ready(function(){
      angular.bootstrap(document, [_APP_]);
    });

  }
};

