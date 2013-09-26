;(function (angular, stdlib) {
  "use strict";
  angular.module(
    "iteamse.module.main-title",
    []
  )
  .directive("title", function () {
    return {
      resrict: "A",
      link: function (scope, element) {
        var doc;
        doc = angular.element(stdlib.document);

        console.log(doc);
        console.log("mainTitle >>", angular.element(element).text());
      }
    };
  });
})(angular, window);