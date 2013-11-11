(function () {
  "use strict";
  angular.module(
    "iteamse.module.softHyphen",
    []
  )
  .directive("softHyphen", function () {
    return {
      restrict: "A",
      link: function (scope, element) {
        angular.element(element).html(angular.element(element).html().replace('--','&shy;'));
      }
    };
  });
})();