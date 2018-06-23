(function(angular) {
  'use strict';

  // intialise App and submodules
  angular.module('App.Controllers', []);
  angular.module('App.Directives', []);
  angular.module('App.Services', []);
  angular.module('App.Factory', []);
  angular.module('App', [
    'ngSanitize',
    'App.Controllers',
    'App.Directives',
    'App.Services',
    'App.Factory'
  ]);

})(window.angular);