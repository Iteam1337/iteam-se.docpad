;(function () {
  "use strict";
  angular.module("revolunet.angular-carousel.image-carousel", [
    ])
  .directive("imageCarousel", ["$parse", "$compile", function ($parse, $compile) {
    return {
      restrict: "E",
      transclude: true,
      replace: true,
      scope: true,
      template: '<ul rn-carousel><li ng-repeat="item in images" style="background-image:url({{item}});"></li></ul>',
      compile: function () {
        return function (scope, iElement, iAttrs) {
          scope.images = $parse(iAttrs.images)(scope);
          scope.$watchCollection("carouselCollection.position", function(newValue) {
            console.log(newValue);
          });
        };
      }
    };
  }]);
})();