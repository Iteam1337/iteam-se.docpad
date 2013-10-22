;(function () {
  angular.module("revolunet.angular-carousel.indicators", [])
  .directive('rnCarouselIndicators', [
    function() {
      return {
        restrict: 'A',
        replace: true,
        scope: {
          items: '=',
          index: '=',
          setActiveIndex: '='
        },
        template: '<div class="rn-carousel-indicator">' +
                    '<span ng-click="$parent.setActiveIndex(i)" ng-repeat="(i, item) in items" ng-class="{active: $index==$parent.index}"></span>' +
                  '</div>'
      };
    }
  ]);
})(angular);