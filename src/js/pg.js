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
      angular.bootstrap(document, [_APP_NAME_]);
    });

  }
};

