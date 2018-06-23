angular.module('App.Directives')
  .directive('customer', function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '',//'../src/customer-template.html',
      scope: {
        info: '='
      },
      controllerAs: 'customer',
      bindToController: true,
      controller: function($scope, $element) {
        
        // record click:
        this.onChange = function() {
          this.info.clicks++;
        }
        
      }
    };
  });